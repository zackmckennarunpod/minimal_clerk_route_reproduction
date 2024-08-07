import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: "/((?!.*\\.).*)",
};

export async function middleware(req: NextRequest) {
  if (!process.env.EDGE_CONFIG) {
    console.error("missing edge config");
  }

  const pathname = req.nextUrl.pathname;

  try {
    // Check whether the maintenance page should be shown
    const isInMaintenanceMode = await get<boolean>("isInMaintenanceMode");
    const hiddenLinks: string[] = (await get<string[]>("hiddenLinks")) || [];
    const disabledRoutes: string[] =
      (await get<string[]>("disabledRoutes")) || [];
    const featureFlags: string[] = (await get<string[]>("featureFlags")) || [];
    const banners: string[] = (await get<string[]>("banners")) || [];
    const res = NextResponse.next();
    res.cookies.set("hiddenLinks", JSON.stringify(hiddenLinks));
    res.cookies.set("disabledRoutes", JSON.stringify(disabledRoutes));
    res.cookies.set("featureFlags", JSON.stringify(featureFlags));
    res.cookies.set("banners", JSON.stringify(banners));

    // If is in maintenance mode, point the url pathname to the maintenance page
    if (isInMaintenanceMode) {
      // redirect to www maintenance page
      return NextResponse.redirect(`${req.nextUrl?.origin}/maintenance`);
    }

    if (disabledRoutes.some((route) => pathname.startsWith(route))) {
      const redirect = NextResponse.redirect(`${req.nextUrl?.origin}/404`);
      return redirect;
    }

    // If nothing matches, just continue with the request and set the cookie
    return res;
  } catch (error) {
    // show the default page if EDGE_CONFIG env var is missing,
    // but log the error to the console
    console.error(error);
    return NextResponse.next();
  }
}
