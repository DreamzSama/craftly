import React from "react";

interface InvoiceFormProps {
    formState: any;
    handleChange: (field: string, value: string) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
    formState,
    handleChange,
}) => {
    return (
        <div className="space-y-8">
            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Empfänger
                </label>
                <input
                    type="text"
                    value={formState.recipient}
                    onChange={(e) => handleChange("recipient", e.target.value)}
                    placeholder="Empfänger"
                    className="w-full px-4 py-3 border rounded-lg"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Rechnungsnummer
                </label>
                <input
                    type="text"
                    value={formState.invoiceNumber}
                    onChange={(e) =>
                        handleChange("invoiceNumber", e.target.value)
                    }
                    placeholder="Rechnungsnummer"
                    className="w-full px-4 py-3 border rounded-lg"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Betreff
                </label>
                <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Betreff"
                    className="w-full px-4 py-3 border rounded-lg"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Beschreibung/Anschreiben
                </label>
                <textarea
                    value={formState.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    placeholder="Beschreibung"
                    className="w-full px-4 py-3 border rounded-lg"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Rechnungsdatum
                </label>
                <input
                    type="date"
                    value={formState.invoiceDate}
                    onChange={(e) =>
                        handleChange("invoiceDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                />
            </div>
        </div>
    );
};

export default InvoiceForm;
