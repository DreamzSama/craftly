import { NextResponse } from "next/server";
import { prisma } from "../../../../../utils/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!findUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            findUser.password
        );

        if (!isPasswordValid) {
            return new NextResponse("Invalid password", { status: 401 });
        }

        NextResponse.json({
            message: "Login successful",
        })
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
