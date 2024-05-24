"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BookingDataProps } from "../_components/ReservationForm";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality")?.toString() ?? ""
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.id);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: BookingDataProps,

  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session?.user?.id,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")!.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/thankyou");
}

export async function updateBooking(formData: FormData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Data extraction
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations") as string;
  const bookingId = Number(formData.get("bookingId"));

  // 3) Authorization
  const guestBookings = await getBookings(session?.user?.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to update this booking");

  // 4) Update booking
  const updateData = {
    numGuests,
    observations: observations.slice(0, 1000),
  };

  // 5) Update booking in the database
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  // 6) Revalidation

  // 7) Redirect to the reservations page
  redirect("/account/reservations");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Get all bookings for the logged in user
  const guestBookings = await getBookings(session?.user?.id);
  // Get all booking IDs for the logged in user
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  // Check if the booking belongs to the logged in user
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
