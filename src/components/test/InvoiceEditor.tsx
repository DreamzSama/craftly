import React, { useEffect, useState } from "react";
import { Invoice } from "@prisma/client";
import InvoiceForm from "../Invoice/InvoiceForm";
import ProductSearch from "../Invoice/ProductSearch";
import InvoicePreview from "../Invoice/InvoicePreview";

interface InvoiceEditorProps {
    invoiceData: Invoice | null;
}

const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ invoiceData }) => {
    const [formState, setFormState] = useState({
        recipient: "",
        invoiceNumber: invoiceData?.invoiceNumber || "",
        subject: "",
        description: "",
        invoiceDate: "",
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (invoiceData) {
            setFormState({
                recipient: "",
                invoiceNumber: invoiceData.invoiceNumber || "",
                subject: "",
                description: invoiceData.description || "",
                invoiceDate: invoiceData.issueDate
                    ? new Date(invoiceData.issueDate)
                          .toISOString()
                          .split("T")[0]
                    : "",
            });
        }
    }, [invoiceData]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (field: string, value: string) => {
        setFormState((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleProductSelect = (product: Product) => {
        if (!selectedProducts.find((p) => p.id === product.id)) {
            setSelectedProducts((prevSelected) => [...prevSelected, product]);
        }
    };

    const removeProduct = (productId: number) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.filter((product) => product.id !== productId)
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex space-x-4">
                <div className="space-y-8 max-w-xl w-full bg-white shadow-2xl rounded-lg p-8">
                    <InvoiceForm
                        formState={formState}
                        handleChange={handleChange}
                    />
                    <ProductSearch
                        products={products}
                        onProductSelect={handleProductSelect}
                    />
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg">
                        Position hinzufügen
                    </button>
                </div>
                <div className="space-y-6 w-full">
                    <InvoicePreview
                        formState={formState}
                        selectedProducts={selectedProducts}
                        removeProduct={removeProduct}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvoiceEditor;
