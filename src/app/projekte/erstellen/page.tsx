"use client";

import ModalInputs from "@/components/Project/ModalInputs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    // Funktion, um Änderungen zu erfassen (für Inputs und Textareas)
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Funktion, um das Formular abzusenden
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Erfolgsnachricht anzeigen
                console.log("Project created successfully");
                // Nach der Erstellung zur Projektübersicht navigieren
                router.push("/projekte");
                // Formular zurücksetzen
                setFormData({
                    title: "",
                    description: ""
                });
            } else {
                console.error("Failed to create project:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="p-3">
            <h1 className="text-3xl font-bold mb-4">Projekt erstellen</h1>
            <div className="bg-white p-6 rounded-xl">
                <div className="flex justify-end">
                    <div className="flex space-x-2">
                        <button className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-xl">
                            Abbrechen
                        </button>
                        <button onClick={handleSubmit} className="bg-primary hover:bg-hoverPrimary text-white font-bold py-2 px-4 rounded-xl">
                            Projekt erstellen
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    <ModalInputs onChange={handleInputChange}
                        input_name="title"
                        label_name="Projekttitel"
                        placeholder="z.B BV: Berlin Grundschule"
                        type="text"
                        required={true}
                    />
                    <div>
                        <label htmlFor="projektbeschreibung">
                            Projektbeschreibung
                        </label>
                        <input onChange={handleInputChange}
                            name="description"
                            id="projektbeschreibung"
                            placeholder="Projektbeschreibung"
                            className="w-full h-32 p-3 border-2 bg-gray-100 rounded-lg resize-none focus:outline-none focus:outline-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
