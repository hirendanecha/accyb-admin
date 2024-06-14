import type { NextAuthOptions, RequestInternal } from 'next-auth';
import type { NextRequest } from 'next/server';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
import axios from 'axios';
import authAPI from '@/services/api/auth';
import { headers } from 'next/headers';
import otpAPI from '@/services/api/enterOtp';
export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async session({ session, token }: any) {
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.idToken as string,
      //   },
      // };

      if (token) {
        session.jwt = token.jwt;
        session.sessionId = token.sessionId;
      }

      return session;
    },
    async jwt({ token, user }: any) {
      // if (user) {
      //   // return user as JWT
      //   token.user = user;
      // }
      // return token;

      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          sessionId: user.sessionId,
        };
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has('callbackUrl')) {
        return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        otp: { label: 'Otp', type: 'text' },
      },
      async authorize(credentials: any) {
        try {
          // console.log('auth-options.ts', credentials);

          const response = await otpAPI({
            email: credentials?.email,
            otp: credentials?.otp,
          });

          // console.log('response', response.data);

          // // Below Condition is unnecessary
          if (!response?.success) {
            console.log('no token');
            throw new Error(response?.data?.message);
          }

          const jwt = response.token;
          // const session_id = response.data.session_id;
          return {
            ...credentials,
            jwt,
            user: response.data,
          };
        } catch (error: any) {
          console.log(error);

          console.log('auth-options.ts ERR', error?.response?.data?.message);
          throw new Error(error?.response?.data?.message);
          // return null;`
        }
      },
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
