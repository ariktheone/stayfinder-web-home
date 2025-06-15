
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// For demo purposes - in production, use your actual publishable key
const stripePromise = loadStripe("pk_test_51234567890123456789012345678901234567890123456789012345678901234567890123456789");

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm = ({ bookingId, amount, onSuccess, onCancel }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent();
  }, [bookingId, amount]);

  const createPaymentIntent = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          booking_id: bookingId,
          amount: amount,
          currency: 'usd'
        }
      });

      if (error) throw error;

      setClientSecret(data.client_secret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);

    const card = elements.getElement(CardElement);

    if (!card) {
      setLoading(false);
      return;
    }

    // For demo purposes, simulate a successful payment
    toast({
      title: "Demo Mode",
      description: "Simulating payment processing...",
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // In a real implementation, you would confirm the card payment here
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: { card: card }
      // });

      // For demo, simulate success
      const mockPaymentIntentId = `pi_demo_${Date.now()}`;
      
      const { data, error } = await supabase.functions.invoke('confirm-payment', {
        body: {
          payment_intent_id: mockPaymentIntentId,
          booking_id: bookingId
        }
      });

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed.",
      });

      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
      toast({
        title: "Payment Failed",
        description: "Payment could not be processed. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span>Secure Payment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">${(amount / 100).toFixed(2)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Lock className="h-4 w-4 mr-2" />
            <span>256-bit SSL encryption</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Card Information</label>
            <div className="border p-4 rounded-lg bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>
            <p className="text-xs text-gray-500">
              Demo Mode: Use test card 4242 4242 4242 4242
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!stripe || loading || !clientSecret}
              className="flex-1"
            >
              {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-4 pt-4 border-t">
          <CreditCard className="h-6 w-6 text-gray-400" />
          <span className="text-xs text-gray-500">Powered by Stripe</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface SecurePaymentFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const SecurePaymentForm = ({ bookingId, amount, onSuccess, onCancel }: SecurePaymentFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        bookingId={bookingId} 
        amount={amount} 
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
};

export default SecurePaymentForm;
