
import { useState, useEffect } from "react";
import { Clock, CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentDeadlineCardProps {
  bookingId: string;
  paymentDeadline: string;
  totalAmount: number;
  onPaymentClick: () => void;
}

const PaymentDeadlineCard = ({ 
  bookingId, 
  paymentDeadline, 
  totalAmount, 
  onPaymentClick 
}: PaymentDeadlineCardProps) => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimeLeft = () => {
      const deadline = new Date(paymentDeadline);
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        setTimeLeft(`${days}d ${remainingHours}h`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [paymentDeadline]);

  const sendReminder = async () => {
    try {
      await supabase.functions.invoke('send-payment-reminder', {
        body: { booking_id: bookingId }
      });
      
      toast({
        title: "Reminder Sent",
        description: "Payment reminder has been sent to your email.",
      });
    } catch (error) {
      console.error("Failed to send reminder:", error);
      toast({
        title: "Failed to Send Reminder",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isExpired) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Payment Expired</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">
            The payment deadline has passed and this booking has been cancelled.
          </p>
          <Badge variant="destructive">Cancelled</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-orange-600">
          <Clock className="h-5 w-5" />
          <span>Payment Required</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Time remaining:</span>
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            {timeLeft}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Amount due:</span>
          <span className="text-xl font-bold text-orange-600">
            ${(totalAmount / 100).toFixed(2)}
          </span>
        </div>

        <div className="bg-orange-100 p-3 rounded-md">
          <p className="text-sm text-orange-800">
            Complete your payment within 48 hours or your booking will be automatically cancelled.
          </p>
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={onPaymentClick}
            className="flex-1 bg-orange-600 hover:bg-orange-700"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Pay Now
          </Button>
          <Button 
            variant="outline" 
            onClick={sendReminder}
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            Send Reminder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDeadlineCard;
