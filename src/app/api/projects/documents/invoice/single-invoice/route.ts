import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../../utils/prisma";

// Fetch all invoices based on projectId or single invoice based on invoiceId
export async function GET(request: NextRequest) {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('invoiceId');

    if (!invoiceId) {
        return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
    }

    try {
        // Convert invoiceId from string to number
        const invoiceIdNumber = parseInt(invoiceId, 10);

        // Validate if the conversion was successful
        if (isNaN(invoiceIdNumber)) {
            return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
        }

        // Fetch the single invoice based on the invoiceId
        const invoice = await prisma.invoice.findUnique({
            where: { id: invoiceIdNumber },
        });

        // If no invoice found, return 404
        if (!invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        // Return the found invoice as JSON
        return NextResponse.json(invoice);
    } catch (error) {
        console.error("Error fetching invoice:", error);
        return new NextResponse("Failed to fetch invoice", { status: 500 });
    }
}