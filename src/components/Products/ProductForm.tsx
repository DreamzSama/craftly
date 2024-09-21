"use client";

import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface ProductFormProps {
    onSubmit: (product: {
        title: string;
        description: string;
        price: number;
        surcharge: number;
        sellPrice: number;
        unit: string;
    }) => void;
    openForm: boolean;
    setOpenForm: (open: boolean) => void;
}

export default function ProductForm({
    onSubmit,
    openForm,
    setOpenForm,
}: ProductFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | string>("");
    const [surcharge, setSurcharge] = useState<number | string>("");
    const [unit, setUnit] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const parsedPrice = parseFloat(price as string);
        const parsedSurcharge = parseFloat(surcharge as string);
        const sellPrice = parsedPrice * (1 + parsedSurcharge / 100);

        onSubmit({
            title,
            description,
            price: parsedPrice,
            surcharge: parsedSurcharge,
            sellPrice: sellPrice,
            unit,
        });

        setTitle("");
        setDescription("");
        setPrice("");
        setSurcharge("");
        setUnit("");

    };

    if (!openForm) {
        return null;
    }

    return (
        <div className="flex flex-row bg-white p-3 rounded-xl justify-between space-x-4 items-end">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    Titel
                </label>
                <input
                    className="p-2 rounded-xl bg-gray-100 border border-gray-300"
                    type="text"
                    placeholder="Titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    Beschreibung
                </label>
                <input
                    className="p-2 rounded-xl bg-gray-100 border border-gray-300"
                    type="text"
                    placeholder="Beschreibung"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    Einkaufspreis (EK)
                </label>
                <input
                    className="p-2 rounded-xl bg-gray-100 border border-gray-300"
                    type="number"
                    placeholder="EK"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    Einheit
                </label>
                <select
                    onChange={(e) => setUnit(e.target.value)}
                    name="unitSelect"
                    id=""
                    className="p-2 rounded-xl bg-gray-100 border border-gray-300"
                >
                    <option value={""}> </option>
                    <option value="Stück">Stück</option>
                    <option value="Lfm">Lfm.</option>
                    <option value="m²">m²</option>
                    <option value="Pauschal">Pauschal</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    Zuschlag (%)
                </label>
                <input
                    className="p-2 rounded-xl bg-gray-100 border border-gray-300"
                    type="number"
                    placeholder="Zuschlag (%)"
                    value={surcharge}
                    onChange={(e) => setSurcharge(e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                    Verkaufspreis
                </label>
                <input
                    type="number"
                    value={
                        price && surcharge
                            ? (
                                  parseFloat(price as string) *
                                  (1 + parseFloat(surcharge as string) / 100)
                              ).toFixed(2)
                            : ""
                    }
                    readOnly
                    className="p-2 rounded-xl bg-gray-200 border border-gray-300"
                />
            </div>

            <div className="flex flex-row space-x-3">
                <XCircleIcon
                    onClick={() => setOpenForm(false)}
                    className="w-10 h-10 cursor-pointer rounded-xl bg-gray-200 p-1 text-black"
                />
                <PlusCircleIcon
                    onClick={handleSubmit}
                    className="w-10 h-10 cursor-pointer rounded-xl bg-primary p-1 text-white"
                />
            </div>
        </div>
    );
}
