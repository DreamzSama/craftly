"use client";

import Modal from "@/components/Project/Modal";
import InvoiceEditor from "@/components/test/InvoiceEditor";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Project } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => {
        setOpenForm(!openForm);
    };

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
        <div className="p-6 bg-gray-100 h-full">
            <h1 className="text-3xl font-bold mb-4">Projekte</h1>

            {/* Projektformular */}

            <div>
                <Link href={"/projekte/erstellen"}>
                    <button className="bg-primary hover:bg-hoverPrimary text-white font-bold py-2 px-4 rounded-xl">
                        Projekt erstellen
                    </button>
                </Link>
            </div>

            {/* Projektliste */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Projektliste</h2>
                {projects.length > 0 ? (
                    <ul className="space-y-2 flex flex-col">
                        {projects.map((project) => (
                            <Link
                                href={`/projekte/${project.id}`}
                                key={project.id}
                            >
                                <div
                                    key={project.id}
                                    className="bg-white flex flex-row justify-between items-center hover:border-primary border-2 transform-all duration-200 p-4 rounded-xl"
                                >
                                    <div>
                                        <div className="flex space-x-4 items-center">
                                            <h3 className="text-lg font-semibold">
                                                {project.title}
                                            </h3>
                                            <div className="dropdown dropdown-end">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    onClick={(e) => e.preventDefault()}
                                                    className="text-yellow-700 z-50 bg-yellow-200 rounded-full px-2 py-1"
                                                >
                                                    In Ausführung
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                                >
                                                    <li>
                                                        <a>Item 1</a>
                                                    </li>
                                                    <li>
                                                        <a>Item 2</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p>{project.description}</p>
                                    </div>
                                    <div className="hover:bg-gray-200 rounded-full p-2 transition-all duration-200">
                                        <EllipsisVerticalIcon onClick={(e) => e.preventDefault()} className="h-8 w-8" />
                                    </div>
                                </div>
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
