import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!.*\\.).*)",
};

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();

    return res;
  } catch (error) {
    // show the default page if EDGE_CONFIG env var is missing,
    // but log the error to the console
    console.error(error);
    return NextResponse.next();
  }
}
