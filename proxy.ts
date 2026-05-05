import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow homepage and /lost (avoid infinite loop)
  if (pathname === "/" || pathname === "/lost") {
    return NextResponse.next();
  }

  // Allow internal Next.js + API + static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect everything else → /lost
  return NextResponse.redirect(new URL("/lost", request.url));
}

export const config = {
  matcher: "/:path*",
};
