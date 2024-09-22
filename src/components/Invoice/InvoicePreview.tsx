import React from "react";
import ProductList from "./ProductList";

interface InvoicePreviewProps {
    formState: any;
    selectedProducts: Product[];
    removeProduct: (productId: number) => void;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
    formState,
    selectedProducts,
    removeProduct,
}) => {
    return (
        <div className="space-y-6 w-full bg-white shadow-lg p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
                Rechnungs-Vorschau
            </h2>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">Absender:</h3>
                <p className="text-gray-500">Dein Unternehmen</p>
                <p className="text-gray-500">Straße, Stadt, PLZ, Land</p>
                <p className="text-gray-500">Email: email@example.com</p>
                <p className="text-gray-500">Telefon: +49 123 456789</p>
            </div>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">Empfänger:</h3>
                <p className="text-gray-700">
                    {formState.recipient || "Empfänger hinzufügen"}
                </p>
            </div>

            <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">Rechnungsdetails:</h3>
                <p className="text-gray-500">
                    Rechnungsnummer: {formState.invoiceNumber || "..."}
                </p>
                <p className="text-gray-500">
                    Betreff: {formState.subject || "..."}
                </p>
                <p className="text-gray-500">
                    Rechnungsdatum: {formState.invoiceDate || "..."}
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold">Positionen:</h3>
                {selectedProducts.length > 0 ? (
                    <ProductList
                        selectedProducts={selectedProducts}
                        removeProduct={removeProduct}
                    />
                ) : (
                    <p className="text-gray-500">Keine Produkte ausgewählt</p>
                )}
            </div>
        </div>
    );
};

export default InvoicePreview;
