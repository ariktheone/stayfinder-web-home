
-- Create a table to track payment deadlines
CREATE TABLE public.booking_payment_deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  payment_deadline TIMESTAMPTZ NOT NULL,
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.booking_payment_deadlines ENABLE ROW LEVEL SECURITY;

-- Create policies for booking payment deadlines
CREATE POLICY "Users can view their own booking deadlines" 
  ON public.booking_payment_deadlines 
  FOR SELECT 
  USING (
    booking_id IN (
      SELECT id FROM public.bookings WHERE guest_id = auth.uid()
    )
  );

CREATE POLICY "System can manage booking deadlines" 
  ON public.booking_payment_deadlines 
  FOR ALL 
  USING (true);

-- Add a payment_deadline column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN payment_deadline TIMESTAMPTZ;

-- Update existing pending bookings to have a 48-hour deadline
UPDATE public.bookings 
SET payment_deadline = created_at + INTERVAL '48 hours'
WHERE status = 'pending' AND payment_deadline IS NULL;

-- Create a function to automatically cancel expired bookings
CREATE OR REPLACE FUNCTION cancel_expired_bookings()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Cancel bookings that are past their payment deadline
  UPDATE public.bookings 
  SET status = 'cancelled'
  WHERE status = 'pending' 
    AND payment_deadline IS NOT NULL 
    AND payment_deadline < NOW();
    
  -- Log the cancellations
  INSERT INTO public.booking_payment_deadlines (booking_id, payment_deadline, reminder_sent)
  SELECT id, payment_deadline, true
  FROM public.bookings 
  WHERE status = 'cancelled' 
    AND payment_deadline < NOW()
    AND id NOT IN (SELECT booking_id FROM public.booking_payment_deadlines);
END;
$$;

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the function to run every hour
SELECT cron.schedule(
  'cancel-expired-bookings',
  '0 * * * *', -- Every hour at minute 0
  'SELECT cancel_expired_bookings();'
);
