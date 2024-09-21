"use client";

import {
    EllipsisVerticalIcon,
    PencilIcon,
    TrashIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    unit: string;
    surcharge: number;
    sellPrice: number;
}

interface ProductTableProps {
    products: Product[];
    onUpdateProduct: (product: Product) => void;
}

export default function ProductTable({ products, onUpdateProduct }: ProductTableProps) {
    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
    const [editRow, setEditRow] = useState<number | null>(null);
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);

    const maxDescriptionLength = 50;

    const toggleDescription = (id: number) => {
        setExpandedDescriptions((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <table className="table bg-white rounded-xl p-3 w-full">
            <thead>
                <tr>
                    <th>Titel</th>
                    <th>Beschreibung</th>
                    <th>EK</th>
                    <th>Einheit</th>
                    <th>Zuschlag</th>
                    <th>Verkaufspreis</th>
                    <th>Aktionen</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    const isExpanded = expandedDescriptions[product.id];
                    const isEditing = editRow === product.id;
                    const description =
                        product.description.length > maxDescriptionLength && !isExpanded
                            ? product.description.slice(0, maxDescriptionLength) + "..."
                            : product.description;

                    const handleEdit = () => {
                        setEditRow(product.id);
                        setEditedProduct(product);
                    };

                    const handleSave = () => {
                        if (editedProduct) {
                            onUpdateProduct(editedProduct);
                        }
                        setEditRow(null);
                        setEditedProduct(null);
                    };

                    const handleCancel = () => {
                        setEditRow(null);
                        setEditedProduct(null);
                    };

                    return (
                        <tr key={product.id}>
                            <td className="font-bold max-w-[300px]">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedProduct?.title || ""}
                                        onChange={(e) =>
                                            setEditedProduct({ ...editedProduct!, title: e.target.value })
                                        }
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    product.title
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <textarea
                                        value={editedProduct?.description || ""}
                                        onChange={(e) =>
                                            setEditedProduct({ ...editedProduct!, description: e.target.value })
                                        }
                                        className="textarea textarea-bordered w-full"
                                    />
                                ) : (
                                    <>
                                        {description}
                                        {product.description.length > maxDescriptionLength && (
                                            <button
                                                onClick={() => toggleDescription(product.id)}
                                                className="ml-2 text-blue-500"
                                            >
                                                {isExpanded ? "Weniger" : "Mehr"}
                                            </button>
                                        )}
                                    </>
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editedProduct?.price || ""}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct!,
                                                price: parseFloat(e.target.value),
                                            })
                                        }
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    `${product.price} €`
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedProduct?.unit || ""}
                                        onChange={(e) =>
                                            setEditedProduct({ ...editedProduct!, unit: e.target.value })
                                        }
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    product.unit
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editedProduct?.surcharge || ""}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct!,
                                                surcharge: parseFloat(e.target.value),
                                            })
                                        }
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    `${product.surcharge} %`
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={editedProduct?.sellPrice || ""}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct!,
                                                sellPrice: parseFloat(e.target.value),
                                            })
                                        }
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    `${product.sellPrice} €`
                                )}
                            </td>
                            <td>
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost">
                                        <EllipsisVerticalIcon className="h-6 w-6" />
                                    </button>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                    >
                                        {isEditing ? (
                                            <>
                                                <li>
                                                    <button
                                                        onClick={handleSave}
                                                        className="flex items-center"
                                                    >
                                                        <CheckIcon className="h-5 w-5 mr-2" />
                                                        Speichern
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="flex items-center"
                                                    >
                                                        <XMarkIcon className="h-5 w-5 mr-2" />
                                                        Abbrechen
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <button
                                                        onClick={handleEdit}
                                                        className="flex items-center"
                                                    >
                                                        <PencilIcon className="h-5 w-5 mr-2" />
                                                        Bearbeiten
                                                    </button>
                                                </li>
                                                <li className="bg-red-500 mt-2 text-white rounded-xl">
                                                    <button className="flex items-center">
                                                        <TrashIcon className="h-5 w-5 mr-2" />
                                                        Löschen
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr>
                    <th>Titel</th>
                    <th>Beschreibung</th>
                    <th>EK</th>
                    <th>Einheit</th>
                    <th>Zuschlag</th>
                    <th>Verkaufspreis</th>
                    <th>Aktionen</th>
                </tr>
            </tfoot>
        </table>
    );
}
