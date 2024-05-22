import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { cabin } from "../_types/types";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }: { cabin: cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-1 border border-primary-800 min-h[400px] md:grid-cols-2 gap-5">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;