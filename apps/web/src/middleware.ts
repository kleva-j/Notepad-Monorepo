import { createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/waitlist(.*)", "/"]);

export function middleware(req: NextRequest) {
  const reqUrl = new URL(req.nextUrl);
  const redirectUrl = new URL("/waitlist", reqUrl);
  if (isPublicRoute(req)) return NextResponse.next();
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)",
  ],
};
