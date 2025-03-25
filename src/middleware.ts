import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware processing request:', request.nextUrl.pathname);

  // Ana sayfa için özel kontrol
  if (request.nextUrl.pathname === '/') {
    console.log('Handling root path - Using home.json');
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // API istekleri için kontrol
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log('Handling API request');
    return NextResponse.next();
  }

  // Statik dosyalar için kontrol
  if (
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.startsWith('/static/') ||
    request.nextUrl.pathname.includes('.')
  ) {
    console.log('Handling static file request');
    return NextResponse.next();
  }

  // Diğer tüm sayfalar için
  console.log('Handling dynamic page request');
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};