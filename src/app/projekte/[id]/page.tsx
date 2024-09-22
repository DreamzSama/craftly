"use client";

import InvoiceEditor from "@/components/test/InvoiceEditor";
import { Invoice } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [selectedOptions, setSelectedOptions] = useState<string>("");
    const [invoices, setInvoices] = useState<Invoice[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams(); // Projekt-ID aus den Parametern

    // Funktion zum Abrufen der Rechnungen
    const fetchInvoices = async () => {
        try {
            const response = await fetch(
                `/api/projects/documents/invoice?id=${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch invoices");
            }
            const data = await response.json();
            setInvoices(data);

            console.log("Invoices:", data);
        } catch (err) {
            console.error("Error fetching invoices:", err);
            setError("Failed to fetch invoices");
        }
    };

    // useEffect, um die Rechnungen beim Laden der Komponente zu laden
    useEffect(() => {
        if (id) {
            fetchInvoices();
        }
    }, [id]);

    const handleDocumentSubmit = async (documentData: {
        projectId: number;
    }) => {
        const init = {
            projectId: documentData.projectId,
            invoiceNumber: "0101243001",
            description: "Test Rechnung",
            ownerId: 2,
            issueDate: new Date(),
            totalAmount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        try {
            const response = await fetch("/api/projects/documents/invoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(init),
            });

            if (!response.ok) {
                throw new Error("Failed to create document");
            }

            const data = await response.json();
            console.log("Document created:", data);
        } catch (error) {
            console.error("Error creating document:", error);
        }
    };

    return (
        <div className="p-3 w-full bg-gray-100 min-h-screen">
            <div>
                {/* Dropdown Menü */}
                <div className="text-right">
                    <details className="dropdown dropdown-end mb-6">
                        <summary className="btn bg-primary text-white hover:bg-orange-700 m-1">
                            Menü öffnen
                        </summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <a
                                    onClick={() =>
                                        setSelectedOptions("Angebot")
                                    }
                                >
                                    Angebot
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDocumentSubmit({
                                            projectId: Number(id),
                                        });
                                        setSelectedOptions("Rechnung"); // Setzt "Rechnung" als ausgewählte Option
                                    }}
                                >
                                    Rechnung
                                </a>
                            </li>
                            <li>
                                <a>Lieferschein</a>
                            </li>
                            <li>
                                <a>Brief</a>
                            </li>
                        </ul>
                    </details>
                </div>

                {invoices && (
                    <div className="flex flex-col space-y-4">
                        {/* Ausgabe der Rechnungen */}
                        {invoices.map((invoice) => (
                            <Link key={invoice.id} href={`/projekte/${id}/invoice/${invoice.id}`}>
                            <div className="bg-white p-3 rounded-xl">
                                <div>
                                    <div key={invoice.id}>
                                        <p className="font-bold">
                                            R-{invoice.invoiceNumber}
                                        </p>
                                        <p>{invoice.description}</p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Bedingte Anzeige basierend auf der Auswahl
                {selectedOptions === "Angebot" && <div>Angebot</div>}
                {selectedOptions === "Rechnung" && <InvoiceEditor />} */}
            </div>
        </div>
    );
}
