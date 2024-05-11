import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes
  matcher: [
    '/',
    // '/module/events',
    // '/module/news',
    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    '/invoice/:path*',
    '/forms/profile-settings/:path*',
  ],
};

// export const config = {
//   // restricted routes
//   matcher: [
//     '/((?!api|static|favicon.ico|auth/forgot-password-5|auth/create-new-password).*)',
//   ],
// };