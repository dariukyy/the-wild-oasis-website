export type cabin = {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  observations?: string;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  };
};

export type guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export type searchParamsProps = {
  searchParams: { capacity: "small" | "medium" | "large" | "all" };
};
export type rangeProps = {
  from: Date | null;
  to: Date | null;
};
