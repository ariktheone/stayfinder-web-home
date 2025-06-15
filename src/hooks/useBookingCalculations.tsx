
import { useMemo } from 'react';

interface UseBookingCalculationsProps {
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
}

export const useBookingCalculations = ({
  checkIn,
  checkOut,
  pricePerNight
}: UseBookingCalculationsProps) => {
  const calculations = useMemo(() => {
    if (!checkIn || !checkOut) {
      return {
        totalNights: 0,
        subtotal: 0,
        cleaningFee: 0,
        serviceFee: 0,
        totalAmount: 0,
        isValidDates: false
      };
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (totalNights <= 0) {
      return {
        totalNights: 0,
        subtotal: 0,
        cleaningFee: 0,
        serviceFee: 0,
        totalAmount: 0,
        isValidDates: false
      };
    }

    const priceInDollars = Math.round(pricePerNight / 100);
    const subtotal = totalNights * priceInDollars;
    const cleaningFee = Math.round(subtotal * 0.1); // 10% cleaning fee
    const serviceFee = Math.round(subtotal * 0.12); // 12% service fee
    const totalAmount = subtotal + cleaningFee + serviceFee;

    return {
      totalNights,
      subtotal,
      cleaningFee,
      serviceFee,
      totalAmount: totalAmount * 100, // Convert back to cents for database
      totalAmountDisplay: totalAmount,
      isValidDates: true
    };
  }, [checkIn, checkOut, pricePerNight]);

  return calculations;
};
