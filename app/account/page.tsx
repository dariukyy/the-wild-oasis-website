import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

async function page() {
  const session = await auth();
  const fullName = session?.user?.name || null;
  const name = fullName ? fullName.split(" ")[0] : null;

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {name || "guest"} !
    </h2>
  );
}

export default page;
