import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        try {
          await connectDb();
          // Check if the user already exists in the database
          const currentUser = await User.findOne({ email: user.email });
          if (!currentUser) {
            // Create a new user
            const newUser = await User.create({
              email: user.email,
              username: user.email.split("@")[0],
            });
          }
          return true;
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }
    },

    async session({ session, user, token }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.name = dbUser.username;
        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session; // Return the session even if there's an error
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };