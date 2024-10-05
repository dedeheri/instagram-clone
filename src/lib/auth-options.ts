import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/accounts/signin",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          return {
            id: response?.data?.results?.id,
            email: response?.data?.results?.email,
            fullname: response?.data?.results?.fullname,
            username: response?.data?.results?.username,
            bio: response?.data?.results?.bio,
            image: response?.data?.results?.image,
          } as any;
        } catch (error: any) {
          throw new Error(JSON.stringify(error?.response?.data));
        }
      },
    }),
  ],

  // strategy
  session: {
    strategy: "jwt",
  },
  // secret
  secret: "THis Secret",

  // callbaks
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          fullname: user.fullname,
          username: user.username,
          bio: user.bio,
        };
      }

      return token;
    },

    // session
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          fullname: token.fullname,
          username: token.username,
          bio: token.bio,
        },
      };
    },
  },
};
