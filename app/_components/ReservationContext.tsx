"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { rangeProps } from "../_types/types";

type ReservationContextType = {
  range: rangeProps;
  setRange: (range: rangeProps) => void | null;
  resetRange: () => void;
};

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext<ReservationContextType | null>(null);

export default function ReservationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [range, setRange] = useState<rangeProps>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext)!;
  if (context === undefined) {
    throw new Error(
      "useReservation context must be used in a ReservationProvider"
    );
  }

  return context;
}
