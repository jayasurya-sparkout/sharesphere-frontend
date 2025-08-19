import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedInCookie = request.cookies.get("userLoggedIn")?.value;
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set security headers
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Cache-Control", "no-store");

  const publicPaths = ["/auth/login", "/auth/register"];
  
  if (!loggedInCookie && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (loggedInCookie && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
