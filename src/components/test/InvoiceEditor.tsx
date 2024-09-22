"use client";

import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Invoice } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function InvoiceEditor({
    invoiceData,
}: {
    invoiceData: Invoice | null;
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const [recipient, setRecipient] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState(
        invoiceData?.invoiceNumber
    );
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [invoiceDate, setInvoiceDate] = useState("");

    // Use useEffect to update the form fields when invoiceData is available
    useEffect(() => {
        if (invoiceData) {
            setInvoiceNumber(invoiceData.invoiceNumber);
            setSubject(invoiceData.description || "");
            setDescription(invoiceData.description || "");
        }
    }, [invoiceData]); // Run when invoiceData changes

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();

        console.log(invoiceData);
    }, []);

    // Filter products based on the search term
    useEffect(() => {
        if (searchTerm.trim() !== "") {
            setFilteredProducts(
                products.filter((product) =>
                    product.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    // Handle product selection
    const handleProductSelect = (product: Product) => {
        if (!selectedProducts.find((p) => p.id === product.id)) {
            setSelectedProducts((prevSelected) => [...prevSelected, product]);
        }
    };

    // Remove product from selected list
    const removeProduct = (productId: number) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.filter((product) => product.id !== productId)
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto">
                <div className="flex space-x-4">
                    {/* Left Side - Form */}
                    <div className="space-y-8 max-w-xl w-full bg-white shadow-2xl rounded-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-700 mb-6">
                            Invoice Details
                        </h2>

                        {/* Recipient */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Empfänger
                            </label>
                            <input
                                type="text"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="Empfänger"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-200 transition-all border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Invoice Number */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Rechnungsnummer
                            </label>
                            <input
                                type="text"
                                value={invoiceNumber}
                                onChange={(e) =>
                                    setInvoiceNumber(e.target.value)
                                }
                                placeholder="Rechnungsnummer"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-200 transition-all border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Subject */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Betreff
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Betreff"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-200 transition-all border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Beschreibung/Anschreiben
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Beschreibung"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-200 transition-all border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Invoice Date */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Rechnungsdatum
                            </label>
                            <input
                                type="date"
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-200 transition-all border-gray-300 shadow-sm"
                            />
                        </div>

                        {/* Product Search */}
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-600 mb-1">
                                Produkt suchen
                            </label>
                            <input
                                type="text"
                                placeholder="Produkt suchen..."
                                className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-200 transition-all border-gray-300 shadow-sm"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* Filtered Products List */}
                            {filteredProducts.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto">
                                    {filteredProducts.map((product) => (
                                        <li
                                            key={product.id}
                                            className="p-2 hover:bg-blue-100 cursor-pointer flex justify-between items-center"
                                            onClick={() =>
                                                handleProductSelect(product)
                                            }
                                        >
                                            <span>{product.title}</span>
                                            <span className="text-gray-500">
                                                {product.price}€
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Add Position Button */}
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all flex justify-center items-center">
                            <PlusIcon className="w-6 h-6 mr-2" />
                            Position hinzufügen
                        </button>
                    </div>

                    {/* Right Side - Invoice Preview */}
                    <div className="space-y-6 w-full bg-white shadow-lg p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">
                            Rechnungs-Vorschau
                        </h2>

                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-lg font-semibold">
                                Absender: Dein Unternehmen
                            </h3>
                            <p className="text-gray-500">
                                Straße, Stadt, PLZ, Land
                            </p>
                            <p className="text-gray-500">
                                Email: email@example.com
                            </p>
                            <p className="text-gray-500">
                                Telefon: +49 123 456789
                            </p>
                        </div>

                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-lg font-semibold">
                                Empfänger:
                            </h3>
                            <p className="text-gray-700">
                                {recipient || "Empfänger hinzufügen"}
                            </p>
                        </div>

                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-lg font-semibold">
                                Rechnungsdetails:
                            </h3>
                            <p className="text-gray-500">
                                Rechnungsnummer: {invoiceNumber}
                            </p>
                            <p className="text-gray-500">
                                Betreff: {subject || "..."}
                            </p>
                            <p className="text-gray-500">
                                Rechnungsdatum: {invoiceDate || "..."}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold">
                                Positionen:
                            </h3>
                            {selectedProducts.length > 0 ? (
                                <table className="w-full text-left mt-4">
                                    <thead>
                                        <tr>
                                            <th className="pb-2 border-b text-gray-600">
                                                Produkt
                                            </th>
                                            <th className="pb-2 border-b text-gray-600">
                                                Preis
                                            </th>
                                            <th className="pb-2 border-b text-gray-600">
                                                Anzahl
                                            </th>
                                            <th className="pb-2 border-b text-gray-600">
                                                MwSt. %
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProducts.map(
                                            (product, index) => (
                                                <tr key={product.id}>
                                                    <td className="py-2">
                                                        {product.title}
                                                    </td>
                                                    <td className="py-2">
                                                        {product.price}€
                                                    </td>
                                                    <td className="py-2">
                                                        <input
                                                            className="w-12 px-2 py-1 border rounded-lg"
                                                            type="number"
                                                            defaultValue={1}
                                                        />
                                                    </td>
                                                    <td className="py-2">
                                                        <input
                                                            className="w-12 px-2 py-1 border rounded-lg"
                                                            type="number"
                                                            defaultValue={19}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500">
                                    Keine Produkte ausgewählt
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
