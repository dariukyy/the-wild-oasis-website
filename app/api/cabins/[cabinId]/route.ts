import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

type Props = {
  params: {
    cabinId: string;
  };
};

export async function GET(request: Request, { params }: Props) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin not found" });
  }
}
