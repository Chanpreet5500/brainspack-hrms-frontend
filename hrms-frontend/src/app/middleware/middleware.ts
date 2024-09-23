// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getUserRole } from './utils/auth';

// export function middleware(req: NextRequest) {
//   const role = getUserRole(req);
//   const url = req.nextUrl.clone();

//   if (url.pathname.startsWith('/admin') && role !== 'admin') {
//     url.pathname = '/unauthorized';
//     return NextResponse.redirect(url);
//   }

//   if (url.pathname.startsWith('/user') && role !== 'user') {

//     url.pathname = '/unauthorized';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/user/:path*'],
// };
