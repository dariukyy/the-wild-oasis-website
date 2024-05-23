// import { NextResponse } from "next/server";

import { auth } from "./app/_lib/auth";

// export function middleware(request: Request) {
//   return NextResponse.redirect(new URL("/about", request.url.toString()));
// }

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
