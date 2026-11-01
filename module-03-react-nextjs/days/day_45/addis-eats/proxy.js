import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("addis_eats_session");

  const pathname = request.nextUrl.pathname;

  const protectedPaths = ["/checkout", "/orders", "/kitchen"];

  const needsAuthentication = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (needsAuthentication && !session) {
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};
