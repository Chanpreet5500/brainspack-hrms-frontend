
import NextAuth from "next-auth";
import { connect } from "@/dbConfig/dbConfig";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email'
        }
      },

    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.givenName = profile?.given_name || '';
        token.familyName = profile?.family_name || '';
        token.image = profile?.picture || '';
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.givenName = token.givenName;
      session.user.familyName = token.familyName;
      session.user.image = token.image;
      return session;
    },
    async signIn({ profile }) {
      return true;

    },
  },
});