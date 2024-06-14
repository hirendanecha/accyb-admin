import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";
import { signOut } from "next-auth/react";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "credentials",
      // credentials: {
      //   email: { label: "Email", type: "email" },
      //   password: { label: "Password", type: "password" },
      // },
      // async authorize(credentials) {
      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error("Missing credentials");
      //   }
      //   const foundUser = user.find((u) => u.email === credentials.email);

      //   if (!foundUser) {
      //     throw new Error("User not found");
      //   }

      //   //  check correctPassword plain without bcrypt
      //   const correctPassword = credentials.password === foundUser.password;

      //   if (!correctPassword) {
      //     throw new Error("Invalid password");
      //   }

      //   return foundUser;
      // },
      // callbacks: {
      //   async signIn({ user }) {
      //     if (!user.email?.endsWith(process.env.ALLOWED_DOMAIN)) {
      //       throw new Error("You are not allowed to access this platform");
      //     }
      //     return true;
      //   },

      //   jwt: async ({ token, user }) => {
      //     if (user) {
      //       token.role = user.role;
      //     }
      //     return token;
      //   },
      //   async session({ session, token }) {
      //     if (session.user) {
      //       session.user.role = token.role;
      //     }
      //     return session;
      //   },
      // },
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(credentials, "credentials");

        try {
          const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const data = await response.json();
            console.log(data, "data");
            throw new Error(data?.message);
          }

          const user = await response.json();
          console.log(user, "user");
          // const userRole = user.data.role;
          const userFirstName = user.data.name;
          // const userLastName = user.data.lastName;
          const userEmail = user.data.email;
          const jwt = user.token;
          return {
            ...credentials,
            jwt,
            // user,
            // role: userRole,
            userFirstName,
            // userLastName,
            userEmail,
          };
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        // session.role = token.role;
        session.userFirstName = token.userFirstName;
        // session.userLastName = token.userLastName;
        session.userEmail = token.userEmail;
        // session.role = "technician";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          // role: user.role,
          userFirstName: user.userFirstName,
          // userLastName: user.userLastName,
          userEmail: user.userEmail,
          // user: user.data,
          // role: "technician",
        };
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
