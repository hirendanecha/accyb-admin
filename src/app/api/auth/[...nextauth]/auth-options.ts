import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
import userAPI from '@/services/api/auth';

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
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid
        // const user = {
        //   email: 'abhi.opsh@gmail.com',
        //   password: 'password@123',
        // };

        const data = await userAPI({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (data) {
          return { ...credentials, jwt: data.token, user: data.data };
        }

        // if (
        //   isEqual(user, {
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   })
        // ) {
        //   return user as any;
        // }
        return null;
      },
    }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID || '',
    //   clientSecret: env.GOOGLE_CLIENT_SECRET || '',
    //   allowDangerousEmailAccountLinking: true,
    // }),
  ],
};
