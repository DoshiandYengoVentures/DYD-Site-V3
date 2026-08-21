import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // getToken()'s auto-detection of the secure cookie prefix (__Secure-...) is
  // based on the request's reported protocol, which can be unreliable behind
  // Vercel's edge network - it was returning null here even for a genuinely
  // valid session cookie. Read the actual cookie name off the request instead
  // of relying on that auto-detection.
  const cookieName = req.cookies.has("__Secure-authjs.session-token")
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = await getToken({ req, secret: process.env.AUTH_SECRET, cookieName });
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
