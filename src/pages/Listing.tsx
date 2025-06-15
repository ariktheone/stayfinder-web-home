
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Users, Bed, Bath, Wifi, Car, Waves, Mountain, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import StripePayment from "@/components/StripePayment";
import PaymentDeadlineCard from "@/components/PaymentDeadlineCard";
import NearbyListings from "@/components/NearbyListings";
import InteractiveListingMap from "@/components/InteractiveListingMap";
import BookingCard from "@/components/BookingCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOptimizedListing } from "@/hooks/useOptimizedListing";
import { useBookingCalculations } from "@/hooks/useBookingCalculations";

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { listing, nearbyListings, loading, nearbyLoading } = useOptimizedListing(id);
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showPaymentDeadline, setShowPaymentDeadline] = useState(false);

  const { totalAmount } = useBookingCalculations({
    checkIn,
    checkOut,
    pricePerNight: listing?.price_per_night || 0
  });

  const amenityIcons: { [key: string]: any } = {
    WiFi: Wifi,
    Parking: Car,
    "Beach Access": Waves,
    "Mountain View": Mountain,
  };

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to make a booking.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!checkIn || !checkOut) {
      toast({
        title: "Missing dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    setBookingLoading(true);

    try {
      const paymentDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000);

      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          listing_id: id,
          guest_id: user.id,
          check_in: checkIn,
          check_out: checkOut,
          total_guests: guests,
          total_amount: totalAmount,
          status: 'pending',
          payment_deadline: paymentDeadline.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      await supabase
        .from('booking_payment_deadlines')
        .insert({
          booking_id: booking.id,
          payment_deadline: paymentDeadline.toISOString(),
          reminder_sent: false
        });

      setBookingId(booking.id);
      setShowPaymentDeadline(true);

      toast({
        title: "Booking created!",
        description: "You have 48 hours to complete payment.",
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePaymentClick = () => {
    setShowPayment(true);
    setShowPaymentDeadline(false);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment successful!",
      description: "Your booking has been confirmed.",
    });
    navigate('/bookings');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="mb-8">
              <img
                src={listing.images?.[0] || '/placeholder.svg'}
                alt={listing.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Title and Basic Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8</span>
                  <span className="text-gray-500">(42 reviews)</span>
                </div>
              </div>

              {/* Prominent Location Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-6 mb-6">
                <div className="flex items-center text-blue-800 mb-2">
                  <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-semibold">Prime Location</h2>
                    <p className="text-xl font-bold">{listing.location}</p>
                  </div>
                </div>
                <p className="text-blue-700 text-sm">
                  Perfectly situated with easy access to local attractions, dining, and transportation
                </p>
              </div>

              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{listing.max_guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-1" />
                  <span>{listing.bedrooms || 0} bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-1" />
                  <span>{listing.bathrooms || 0} bathrooms</span>
                </div>
              </div>

              <Badge className="mb-4 capitalize">{listing.type}</Badge>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities?.map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Map Section */}
            <div className="mb-8">
              <InteractiveListingMap currentListing={listing} nearbyListings={nearbyListings} />
            </div>

            {/* Nearby Listings */}
            <div className="mb-8">
              <NearbyListings listings={nearbyListings} loading={nearbyLoading} />
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            {showPaymentDeadline && bookingId ? (
              <PaymentDeadlineCard
                bookingId={bookingId}
                paymentDeadline={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()}
                totalAmount={totalAmount}
                onPaymentClick={handlePaymentClick}
              />
            ) : !showPayment ? (
              <BookingCard
                listing={listing}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
                bookingLoading={bookingLoading}
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
                onGuestsChange={setGuests}
                onBooking={handleBooking}
              />
            ) : (
              bookingId && (
                <StripePayment
                  bookingId={bookingId}
                  amount={totalAmount}
                  onSuccess={handlePaymentSuccess}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
