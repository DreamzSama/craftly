import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../utils/prisma";



export async function POST(request: NextRequest) {
    try {
        // Body aus dem Request auslesen
        const body: Product = await request.json();

        // Datensatz in der Datenbank speichern
        const product = await prisma.product.create({
            data: {
                title: body.title,
                description: body.description,
                price: body.price,
                surcharge: body.surcharge,
                sellPrice: body.sellPrice,
                unit: body.unit
            },
        });

        // Erfolgreiche Antwort zurückgeben
        return NextResponse.json(product);
    } catch (error) {
        // Fehlerbehandlung
        console.error("Error creating product:", error);
        return new NextResponse("Failed to create product", { status: 500 });
    }
}

export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}
