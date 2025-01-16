import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  if (!session) {
    if (pathname === "/login") return;
    const loginUrl = new URL("/login?refresh=true", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    pathname !== "/" &&
    !pathname.startsWith("/card-info/") &&
    session.user.role !== "Admin"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/add-card",
    "/card-info/:id*",
    "/login",
    "/view-users",
    "/view-user-details/:id*",
  ],
};
// export default async function middleware() {}
