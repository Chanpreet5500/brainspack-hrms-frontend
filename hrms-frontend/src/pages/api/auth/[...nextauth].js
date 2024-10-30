
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
    async signIn({ profile }) {
      try {
        const response = await fetch("http://localhost:3001/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: profile.email }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.accessToken) {
            profile.apiAccessToken = data.accessToken
            return true;
          }
        }
        return false
      } catch (error) {
        console.error("Error checking email during sign-in:", error);
        return false;
      }
    },
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
      if (profile?.apiAccessToken) {
        token.apiAccessToken = profile.apiAccessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.apiAccessToken) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
        session.apiAccessToken = token.apiAccessToken;
        return session;
      }
      return false
    },

  },
});