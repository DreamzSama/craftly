// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        id: number; // Add the id field to the Session type
    }

    interface JWT {
        id: number; // Add the id field to the JWT token
    }
}
