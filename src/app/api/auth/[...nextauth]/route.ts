import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { authOptions } from "../../../../../utils/authOptions";

const prisma = new PrismaClient();

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
