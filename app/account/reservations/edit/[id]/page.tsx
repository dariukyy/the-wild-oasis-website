import UpdateReservation from "@/app/_components/UpdateReservation";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import { booking } from "@/app/_types/types";

export async function generateMetadata({ params }: params) {
  const { id }: booking = await getBooking(params.id);

  return {
    title: `Edit #${id} Reservation`,
  };
}

type params = {
  params: {
    id: string;
  };
};

export default async function page({ params }: params) {
  const booking: booking = await getBooking(params.id);
  const { maxCapacity } = await getCabin(String(booking.cabinId));

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{booking.id}
      </h2>

      <UpdateReservation booking={booking} maxCapacity={maxCapacity} />
    </div>
  );
}
