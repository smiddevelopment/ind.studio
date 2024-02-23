import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { DEFAULT_LOCALE, LOCALES, isNotTranslatablePath } from '@/shared/i18n';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(LOCALES);

  return match(languages, LOCALES, DEFAULT_LOCALE);
}

export function middleware(request: NextRequest) {
  let response;
  let nextLocale;

  const pathname = request.nextUrl.pathname;

  const pathLocale = LOCALES.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathLocale) {
    const isDefaultLocale = pathLocale === DEFAULT_LOCALE;

    if (isDefaultLocale) {
      let pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';

      if (request.nextUrl.search) pathWithoutLocale += request.nextUrl.search;

      response = NextResponse.redirect(new URL(pathWithoutLocale, request.url));
    }

    nextLocale = pathLocale;
  } else if (isNotTranslatablePath(pathname)) {
    //
  } else {
    const isFirstVisit = !request.cookies.has('locale');

    const locale = isFirstVisit ? getLocale(request) : DEFAULT_LOCALE;

    let newPath = `${locale}${pathname}`;
    if (request.nextUrl.search) newPath += request.nextUrl.search;

    response =
      locale === DEFAULT_LOCALE
        ? NextResponse.rewrite(new URL(newPath, request.url))
        : NextResponse.redirect(new URL(newPath, request.url));

    nextLocale = locale;
  }

  if (!response) response = NextResponse.next();

  if (nextLocale) response.cookies.set('locale', nextLocale);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public/images
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|icons|favicon.ico).*)',
  ],
};
