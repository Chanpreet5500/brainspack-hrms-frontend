
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     scope: 'openid email profile',
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   },
      // },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
    },
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = profile?.picture || '';
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
    async signIn({ profile }) {
      return true;

    },
  },
});