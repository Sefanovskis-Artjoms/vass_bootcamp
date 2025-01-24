import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const intlMiddleware = createMiddleware(routing);
  const intlResponse = intlMiddleware(request);
  const pathname = request.nextUrl.pathname;
  const session = await auth();
  const locale =
    routing.locales.find((loc) => pathname.startsWith(`/${loc}`)) ||
    routing.defaultLocale;

  if (!session) {
    if (pathname === `/${locale}/login`) return;
    const loginUrl = new URL(`/${locale}/login?refresh=true`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (session && pathname === `/${locale}/login`) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (
    pathname !== "/" &&
    pathname !== `/${locale}` &&
    !pathname.startsWith(`${locale}/card-info/`) &&
    session.user.role !== "Admin"
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (intlResponse) return intlResponse;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/(en|lv|ru)/add-card",
    "/(en|lv|ru)/card-info/[id]",
    "/(en|lv|ru)/login",
    "/(en|lv|ru)/view-users",
    "/(en|lv|ru)/view-user-details/[id]",
  ],
};

// export default async function middleware() {}
