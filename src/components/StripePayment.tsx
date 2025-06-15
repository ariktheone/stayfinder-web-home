import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StripePaymentProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}

const StripePayment = ({ bookingId, amount, onSuccess }: StripePaymentProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Mock Stripe payment - in real app, you'd call your payment edge function
      const { data, error } = await supabase.functions.invoke('create-payment-session', {
        body: {
          booking_id: bookingId,
          amount: amount,
          currency: 'usd'
        }
      });

      if (error) {
        // Fallback to mock payment for demo
        await mockPayment();
        return;
      }

      // In real app, redirect to Stripe checkout
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Demo: simulate successful payment
      await mockPayment();
    } finally {
      setLoading(false);
    }
  };

  const mockPayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const { error } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", bookingId);

    if (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Payment Error",
        description: "There was an issue processing your payment.",
        variant: "destructive",
      });
      return;
    }

    await supabase
      .from("payments")
      .insert({
        booking_id: bookingId,
        amount: amount,
        currency: "usd",
        status: "paid",
        stripe_payment_intent_id: `pi_mock_${Date.now()}`
      });

    toast({
      title: "Payment Successful!",
      description: "Your booking has been confirmed.",
    });

    onSuccess();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span>Total Amount:</span>
            <span className="text-xl font-bold">${(amount / 100).toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600">
            This is a demo environment. No real payments will be processed.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure</span>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
            <CreditCard className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Demo Mode: Mock Payment Processing
            </p>
            <p className="text-xs text-gray-500">
              In production, this would integrate with Stripe's secure payment form
            </p>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? "Processing Payment..." : `Pay $${(amount / 100).toFixed(2)}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By clicking "Pay", you agree to our terms of service and privacy policy.
        </p>
      </CardContent>
    </Card>
  );
};

export default StripePayment;
