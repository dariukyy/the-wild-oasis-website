"use client";

import { useOptimistic } from "react";
import { booking } from "../_types/types";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }: { bookings: any }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking: booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking as any}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
