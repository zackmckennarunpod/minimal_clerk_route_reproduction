import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!.*\\.).*)",
};

export async function middleware(req: NextRequest) {
  if (!process.env.EDGE_CONFIG) {
    console.error("missing edge config");
  }

  const pathname = req.nextUrl.pathname;

  try {
    const res = NextResponse.next();

    // If nothing matches, just continue with the request and set the cookie
    return res;
  } catch (error) {
    // show the default page if EDGE_CONFIG env var is missing,
    // but log the error to the console
    console.error(error);
    return NextResponse.next();
  }
}
