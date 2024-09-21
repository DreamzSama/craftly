"use client";

import InvoiceEditor from "@/components/test/InvoiceEditor";
import { Project } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
    });

    // Projekte abrufen
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/projects");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Projekte:", error);
        }
    };

    // Neues Projekt übermitteln
    const handleProjectSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error("Fehler beim Erstellen des Projekts");
            }

            const project = await response.json();
            setProjects((prevProjects) => [...prevProjects, project]);
            setNewProject({ title: "", description: "" }); // Formular zurücksetzen
        } catch (error) {
            console.error("Fehler beim Speichern des Projekts:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Projekte</h1>

            {/* Projektformular */}
            <div className="my-8">
                <h2 className="text-xl font-semibold mb-4">
                    Neues Projekt hinzufügen
                </h2>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Projektname
                        </label>
                        <input
                            type="text"
                            value={newProject.title}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    title: e.target.value,
                                })
                            }
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Beschreibung
                        </label>
                        <textarea
                            value={newProject.description}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    description: e.target.value,
                                })
                            }
                            className="textarea textarea-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Projekt erstellen
                    </button>
                </form>
            </div>

            {/* Projektliste */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Projektliste</h2>
                {projects.length > 0 ? (
                    <ul className="space-y-2">
                        {projects.map((project) => (
                            <Link href={`/projekte/${project.id}`} key={project.id}>
                                <li
                                    key={project.id}
                                    className="bg-gray-100 p-4 rounded-lg shadow"
                                >
                                    <h3 className="text-lg font-semibold">
                                        {project.title}
                                    </h3>
                                    <p>{project.description}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>Keine Projekte verfügbar</p>
                )}
            </div>
        </div>
    );
}
