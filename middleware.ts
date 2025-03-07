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

  const adminPages = [
    `${locale}/add-card`,
    `${locale}/view-users`,
    `${locale}/view-user-details`,
    `${locale}/view-groups`,
    `${locale}/view-group-details`,
  ];

  if (!session) {
    if (pathname === `/${locale}/login` || pathname === `/${locale}/register`)
      return intlResponse;
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    session &&
    (pathname === `/${locale}/login` || pathname === `/${locale}/register`)
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  if (
    adminPages.some((adminPage) => pathname.startsWith(`/${adminPage}`)) &&
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
    "/(en|lv|ru)",
    "/(en|lv|ru)/add-card",
    "/(en|lv|ru)/card-info/:id*",
    "/(en|lv|ru)/login/",
    "/(en|lv|ru)/register",
    "/(en|lv|ru)/view-users",
    "/(en|lv|ru)/view-user-details/:id*",
    "/(en|lv|ru)/view-groups",
    "/(en|lv|ru)/view-group-details/:id*",
  ],
};

// export default async function middleware() {}
