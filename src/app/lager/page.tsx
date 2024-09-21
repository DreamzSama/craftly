"use client";

import ProductForm from "@/components/Products/ProductForm";
import ProductTable from "@/components/Products/ProductTable";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
    };

    const handleProductSubmit = async (productData: {
        title: string;
        description: string;
        price: number;
        surcharge: number;
        sellPrice: number;
        unit: string;
    }) => {
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error("Fehler beim Speichern des Produkts");
            }

            const data = await response.json();
            console.log("Produkt erfolgreich gespeichert:", data);
            setProducts((prevProducts) => [...prevProducts, data]);

            // Optional: fetchProducts(); falls du die Daten direkt vom Server abrufen möchtest
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    return (
        <div className="bg-gray-100 p-3 min-h-screen max-w-screen">
            <div>
                <h1 className="text-3xl font-bold">Lagerbestand</h1>
                <div className="my-6 text-right">
                    <button
                        onClick={() => setOpenForm(true)}
                        className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    >
                        Neuen Bestand
                    </button>
                </div>
                <div className="flex flex-col space-y-6">
                    <ProductForm setOpenForm={setOpenForm}
                        openForm={openForm}
                        onSubmit={handleProductSubmit}
                    />
                    <ProductTable products={products} />
                </div>
            </div>
        </div>
    );
}
