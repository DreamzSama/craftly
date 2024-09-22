"use client";

import InvoiceEditor from "@/components/test/InvoiceEditor";
import { Invoice } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
    const { id, invoiceId } = useParams();

    const [invoice, setInvoice] = useState<Invoice | null>(null);

    const fetchInvoice = async () => {
        try {
            const response = await fetch(
                `/api/projects/documents/invoice/single-invoice?invoiceId=${invoiceId}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch invoice");
            }
            const data = await response.json();
            setInvoice(data); // Store the fetched invoice data
            console.log("Fetched Invoice:", data);
        } catch (err) {
            console.error("Error fetching invoice:", err);
        }
    };

    useEffect(() => {
        if (invoiceId) {
            fetchInvoice(); // Fetch the invoice when the invoiceId is available
        }
    }, [invoiceId]);

    return (
        <div>
            <div>page {invoiceId}</div>
            <div>page {id}</div>

            <InvoiceEditor invoiceData={invoice} />
        </div>
    );
}
