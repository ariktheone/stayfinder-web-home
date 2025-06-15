
import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBookingCalculations } from '@/hooks/useBookingCalculations';
import { Listing } from '@/types/database';

interface BookingCardProps {
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guests: number;
  bookingLoading: boolean;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
  onGuestsChange: (value: number) => void;
  onBooking: () => void;
}

const BookingCard = ({
  listing,
  checkIn,
  checkOut,
  guests,
  bookingLoading,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onBooking
}: BookingCardProps) => {
  const {
    totalNights,
    subtotal,
    cleaningFee,
    serviceFee,
    totalAmountDisplay,
    isValidDates
  } = useBookingCalculations({
    checkIn,
    checkOut,
    pricePerNight: listing.price_per_night
  });

  const pricePerNight = Math.round((listing.price_per_night || 0) / 100);

  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">${pricePerNight}</span>
          <span className="text-gray-600 text-base font-normal">/ night</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => onCheckInChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="checkout" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => onCheckOutChange(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Guests
          </Label>
          <Input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => onGuestsChange(parseInt(e.target.value) || 1)}
            min={1}
            max={listing.max_guests}
            className="mt-1"
          />
        </div>

        {isValidDates && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>${pricePerNight} × {totalNights} nights</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total</span>
              <span>${totalAmountDisplay}</span>
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={onBooking}
          disabled={bookingLoading || !isValidDates || !checkIn || !checkOut}
        >
          {bookingLoading ? "Creating Booking..." : "Reserve"}
        </Button>

        {isValidDates && (
          <p className="text-center text-sm text-gray-500">
            You won't be charged yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
