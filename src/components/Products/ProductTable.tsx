"use client";

import React, { useState, useCallback } from "react";
import {
    EllipsisVerticalIcon,
    PencilIcon,
    TrashIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

interface ProductTableProps {
    products: Product[];
    onUpdateProduct: (product: Product) => void;
}

const MAX_DESCRIPTION_LENGTH = 50;

const ProductTable: React.FC<ProductTableProps> = ({
    products,
    onUpdateProduct,
}) => {
    const [expandedDescriptions, setExpandedDescriptions] = useState<
        Record<number, boolean>
    >({});
    const [editRow, setEditRow] = useState<number | null>(null);
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);

    const toggleDescription = useCallback((id: number) => {
        setExpandedDescriptions((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    }, []);

    const handleEdit = useCallback((product: Product) => {
        setEditRow(product.id);
        setEditedProduct(product);
    }, []);

    const handleSave = useCallback(() => {
        if (editedProduct) {
            onUpdateProduct(editedProduct);
            setEditRow(null);
            setEditedProduct(null);
        }
    }, [editedProduct, onUpdateProduct]);

    const handleCancel = useCallback(() => {
        setEditRow(null);
        setEditedProduct(null);
    }, []);

    const handleInputChange = useCallback(
        (field: keyof Product, value: string | number) => {
            if (editedProduct) {
                setEditedProduct({ ...editedProduct, [field]: value });
            }
        },
        [editedProduct]
    );

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
                        product.description.length > MAX_DESCRIPTION_LENGTH &&
                        !isExpanded
                            ? product.description.slice(
                                  0,
                                  MAX_DESCRIPTION_LENGTH
                              ) + "..."
                            : product.description;

                    return (
                        <tr key={product.id}>
                            <td className="font-bold max-w-[300px]">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedProduct?.title || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "title",
                                                e.target.value
                                            )
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
                                            handleInputChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="textarea textarea-bordered w-full"
                                    />
                                ) : (
                                    <>
                                        {description}
                                        {product.description.length >
                                            MAX_DESCRIPTION_LENGTH && (
                                            <button
                                                onClick={() =>
                                                    toggleDescription(
                                                        product.id
                                                    )
                                                }
                                                className="ml-2 text-blue-500"
                                            >
                                                {isExpanded
                                                    ? "Weniger"
                                                    : "Mehr"}
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
                                            handleInputChange(
                                                "price",
                                                parseFloat(e.target.value)
                                            )
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
                                            handleInputChange(
                                                "unit",
                                                e.target.value
                                            )
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
                                            handleInputChange(
                                                "surcharge",
                                                parseFloat(e.target.value)
                                            )
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
                                            handleInputChange(
                                                "sellPrice",
                                                parseFloat(e.target.value)
                                            )
                                        }
                                        className="input input-bordered w-full"
                                    />
                                ) : (
                                    `${product.sellPrice} €`
                                )}
                            </td>
                            <td>
                                {isEditing ? (
                                    <>
                                        <div className="flex flex-row space-x-4">
                                            <button onClick={handleCancel} className="btn">
                                                Abbrechen
                                            </button>
                                            <button onClick={handleSave} className="btn bg-primary text-white hover:bg-orange-700">
                                                Speichern
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <button
                                            tabIndex={0}
                                            className="btn btn-ghost"
                                        >
                                            <EllipsisVerticalIcon className="h-6 w-6" />
                                        </button>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                        >
                                            <>
                                                <li>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(product)
                                                        }
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
                                        </ul>
                                    </div>
                                )}
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
};

export default ProductTable;
