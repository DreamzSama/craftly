import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../utils/prisma";
import { Invoice } from "@prisma/client";

export async function GET(request: NextRequest) {
    // Extrahiere die Projekt-ID aus den URL-Parametern
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    try {
        // Konvertiere die projectId von string zu number
        const projectIdNumber = parseInt(projectId, 10);

        // Überprüfe, ob die Konvertierung erfolgreich war
        if (isNaN(projectIdNumber)) {
            return NextResponse.json({ error: "Invalid Project ID" }, { status: 400 });
        }

        // Suche alle Rechnungen, die zu dem Projekt gehören
        const invoices = await prisma.invoice.findMany({
            where: { projectId: projectIdNumber },
        });

        // Rückgabe der Rechnungen als JSON-Antwort
        return NextResponse.json(invoices);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        return new NextResponse("Failed to fetch invoices", { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: Invoice = await request.json();
        const invoice = await prisma.invoice.create({ data: body });
        return NextResponse.json(invoice);
    } catch (error) {
        console.error("Error creating invoice:", error);
        return new NextResponse("Failed to create invoice", { status: 500 });
    }
}