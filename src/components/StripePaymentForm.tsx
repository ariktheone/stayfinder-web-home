
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe with a placeholder key - you'll need to replace this with your actual publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}

const PaymentForm = ({ bookingId, amount, onSuccess }: PaymentFormProps) => {
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

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (error) {
      console.error('Payment failed:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Payment could not be processed.",
        variant: "destructive",
      });
    } else if (paymentIntent?.status === 'succeeded') {
      // Confirm payment on backend
      try {
        const { data, error } = await supabase.functions.invoke('confirm-payment', {
          body: {
            payment_intent_id: paymentIntent.id,
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
        console.error('Error confirming payment:', error);
        toast({
          title: "Payment Processing Error",
          description: "Payment succeeded but booking confirmation failed. Please contact support.",
          variant: "destructive",
        });
      }
    }

    setLoading(false);
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure</span>
          </div>
          
          <div className="border p-4 rounded-lg">
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

          <Button
            type="submit"
            disabled={!stripe || loading || !clientSecret}
            className="w-full"
            size="lg"
          >
            {loading ? "Processing Payment..." : `Pay $${(amount / 100).toFixed(2)}`}
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          By clicking "Pay", you agree to our terms of service and privacy policy.
        </p>
      </CardContent>
    </Card>
  );
};

interface StripePaymentFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}

const StripePaymentForm = ({ bookingId, amount, onSuccess }: StripePaymentFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm bookingId={bookingId} amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripePaymentForm;
