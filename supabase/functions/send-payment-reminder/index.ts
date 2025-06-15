
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id } = await req.json();
    
    // Create Supabase client with service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get booking details with user email
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        listings (title, location)
      `)
      .eq('id', booking_id)
      .single();

    if (bookingError || !booking) {
      throw new Error("Booking not found");
    }

    // Get user email from auth.users (this is a mock since we can't access auth.users directly)
    // In a real implementation, you'd store user email in a profiles table
    const mockUserEmail = "guest@example.com";

    // Mock email sending (replace with actual email service like Resend)
    console.log(`
      ============ PAYMENT REMINDER EMAIL ============
      To: ${mockUserEmail}
      Subject: Payment Required - Complete Your Booking
      
      Dear Guest,
      
      Your booking for "${booking.listings?.title}" in ${booking.listings?.location} 
      requires payment completion.
      
      Booking Details:
      - Check-in: ${booking.check_in}
      - Check-out: ${booking.check_out}
      - Total Amount: $${(booking.total_amount / 100).toFixed(2)}
      - Payment Deadline: ${new Date(booking.payment_deadline).toLocaleString()}
      
      Please complete your payment within 48 hours or your booking will be automatically cancelled.
      
      Complete Payment: [Payment Link]
      
      Thank you,
      Your Booking Team
      ===============================================
    `);

    // Update reminder sent status
    await supabase
      .from('booking_payment_deadlines')
      .upsert({
        booking_id: booking_id,
        payment_deadline: booking.payment_deadline,
        reminder_sent: true
      });

    return new Response(
      JSON.stringify({ success: true, message: "Reminder sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending payment reminder:', error);
    return new Response(
      JSON.stringify({ error: "Failed to send reminder" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
