
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Clock, CheckCircle, XCircle, CreditCard, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import StripePaymentForm from "@/components/StripePaymentForm";

interface BookingWithListing {
  id: string;
  check_in: string;
  check_out: string;
  total_guests: number;
  total_amount: number;
  status: string;
  created_at: string;
  listing: {
    id: string;
    title: string;
    location: string;
    images: string[];
    price_per_night: number;
  };
}

const Bookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingWithListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithListing | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          listing:listings (
            id,
            title,
            location,
            images,
            price_per_night
          )
        `)
        .eq("guest_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load your bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Booking cancelled",
        description: "Your booking has been cancelled successfully.",
      });

      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    toast({
      title: "Payment Successful!",
      description: "Your booking has been confirmed.",
    });
    fetchBookings();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getDaysBetween = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Bookings</h1>
          <p className="text-gray-600">Manage your travel reservations</p>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-4">Start exploring amazing places to stay!</p>
              <Button onClick={() => navigate('/')}>Browse Listings</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <img
                        src={booking.listing.images?.[0] || '/placeholder.svg'}
                        alt={booking.listing.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {booking.listing.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{booking.listing.location}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{booking.total_guests} guests</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ${Math.round((booking.total_amount || 0) / 100)}
                      </p>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                  <img
                                    src={selectedBooking.listing.images?.[0] || '/placeholder.svg'}
                                    alt={selectedBooking.listing.title}
                                    className="w-32 h-32 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{selectedBooking.listing.title}</h3>
                                    <div className="flex items-center text-gray-600 mb-2">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      <span>{selectedBooking.listing.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                      {getStatusIcon(selectedBooking.status)}
                                      <Badge className={getStatusColor(selectedBooking.status)}>
                                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Check-in</h4>
                                    <p className="text-gray-600">{new Date(selectedBooking.check_in).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Check-out</h4>
                                    <p className="text-gray-600">{new Date(selectedBooking.check_out).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Guests</h4>
                                    <p className="text-gray-600">{selectedBooking.total_guests} guests</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Duration</h4>
                                    <p className="text-gray-600">{getDaysBetween(selectedBooking.check_in, selectedBooking.check_out)} nights</p>
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-semibold mb-2">Price Breakdown</h4>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span>${selectedBooking.listing.price_per_night / 100} × {getDaysBetween(selectedBooking.check_in, selectedBooking.check_out)} nights</span>
                                      <span>${(selectedBooking.listing.price_per_night * getDaysBetween(selectedBooking.check_in, selectedBooking.check_out)) / 100}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                      <span>Total</span>
                                      <span>${Math.round((selectedBooking.total_amount || 0) / 100)}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-sm text-gray-500">
                                  <p>Booking ID: {selectedBooking.id}</p>
                                  <p>Booked on: {new Date(selectedBooking.created_at).toLocaleDateString()}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {booking.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowPayment(true);
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CreditCard className="mr-1 h-4 w-4" />
                              Pay Now
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => cancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}

                        {booking.status === 'confirmed' && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Paid
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Payment Dialog */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <StripePaymentForm
                bookingId={selectedBooking.id}
                amount={selectedBooking.total_amount}
                onSuccess={handlePaymentSuccess}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Bookings;
