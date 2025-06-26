import { NextRequest, NextResponse } from 'next/server';

// Supported languages
const locales = ['tr', 'en', 'fr'];
const defaultLocale = 'en';

// Get locale from request
function getLocale(request: NextRequest): string {
    // Check if locale is in the pathname
    const pathname = request.nextUrl.pathname;
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    if (pathnameHasLocale) {
        return pathname.split('/')[1];
    }

    // Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0].trim())
            .find((lang) => {
                // Check for exact matches first
                if (locales.includes(lang)) return true;
                // Check for language prefix matches (e.g., 'en-US' -> 'en')
                const langPrefix = lang.split('-')[0];
                return locales.includes(langPrefix);
            });

        if (preferredLocale) {
            const locale = preferredLocale.split('-')[0];
            return locales.includes(locale) ? locale : defaultLocale;
        }
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for API routes, static files, and Next.js internals
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/branding') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/videos') ||
        pathname.startsWith('/flags') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

    if (!pathnameHasLocale) {
        const locale = getLocale(request);
        const url = request.nextUrl.clone();

        // Redirect to the same path with locale prefix
        url.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
        // Optional: only run on root (/) URL
        // '/'
    ]
};
