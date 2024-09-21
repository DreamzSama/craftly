"use client";

import InvoiceEditor from "@/components/test/InvoiceEditor";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function page() {
    const [selectedOptions, setSelectedOptions] = useState<string>("");
    const { id } = useParams();

    return (
        <div>
            page {id}
            <div>
                {/* Dropdown Menü */}
                <details className="dropdown mb-6">
                    <summary className="btn m-1">Menü öffnen</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <a onClick={() => setSelectedOptions("Angebot")}>
                                Angebot
                            </a>
                        </li>
                        <li>
                            <a onClick={() => setSelectedOptions("Rechnung")}>
                                Rechnung
                            </a>
                        </li>
                    </ul>
                </details>

                {/* Bedingte Anzeige basierend auf der Auswahl */}
                {selectedOptions === "Angebot" && <div>Angebot</div>}
                {selectedOptions === "Rechnung" && <InvoiceEditor />}
            </div>
        </div>
    );
}
