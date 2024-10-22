import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/'

    // const token = request.cookies.get('userData')?.value || ''
    const token = request.cookies.get('next-auth.session-token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/employees',
        '/leaves',
        '/calendar'
    ]
}
