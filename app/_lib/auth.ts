import NextAuth, { DefaultSession, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: Session | null }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingGuest = await getGuest(user.email!);

        if (!existingGuest)
          await createGuest({ email: user.email!, fullName: user.name! });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({
      session,
    }: {
      session: Session | null;
    }): Promise<Session | DefaultSession> {
      if (session && session.user) {
        const guest = await getGuest(session.user.email!);
        session.user.id = String(guest?.id);
      }
      return session!;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
