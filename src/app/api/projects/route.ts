import { NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";
import { Project } from "@prisma/client";

export async function GET() {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    const body: Project = await request.json();
    const project = await prisma.project.create({ data: body });
    return NextResponse.json(project);
}