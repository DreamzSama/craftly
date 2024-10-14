// app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    // Wenn kein Token vorhanden ist, redirect zur Login-Seite
    if (!token && pathname.startsWith("/projekte")) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/protected/:path*"], // Schütze alle URLs, die mit /dashboard beginnen
};
