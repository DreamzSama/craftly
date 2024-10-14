import { NextResponse } from "next/server";
import { prisma } from "../../../../../utils/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const body: User = await request.json();

        const hashedPassword = await bcrypt.hash(body.password, 10)
        const registerUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(registerUser);
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
