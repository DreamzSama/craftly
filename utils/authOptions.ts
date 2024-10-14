import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Check if email and password are provided
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Email and password are required");
                }

                // Fetch user from the database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // If user doesn't exist or password is missing
                if (!user || !user.password) {
                    throw new Error("Invalid email or password");
                }

                // Compare the provided password with the hashed password
                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValidPassword) {
                    throw new Error("Invalid email or password");
                }

                // Return user object without the password field
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            },
        }),
    ],
    adapter: PrismaAdapter(prisma), // Use Prisma adapter for better integration
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Assert token.id as number to avoid TypeScript error
            session.id = token.id as number;
            return session;
        },
    },
    pages: {
        signIn: "/auth", // Custom sign-in page
        error: "/auth/error", // Custom error page
        signOut: "/auth", // Custom
    },
    debug: process.env.NODE_ENV === "development", // Enable debug in development
};
