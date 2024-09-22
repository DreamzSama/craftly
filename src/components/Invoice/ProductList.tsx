import React from "react";

interface ProductListProps {
    selectedProducts: Product[];
    removeProduct: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    selectedProducts,
    removeProduct,
}) => {
    return (
        <table className="w-full text-left mt-4">
            <thead>
                <tr>
                    <th className="pb-2 border-b text-gray-600">Produkt</th>
                    <th className="pb-2 border-b text-gray-600">Preis</th>
                    <th className="pb-2 border-b text-gray-600">Anzahl</th>
                    <th className="pb-2 border-b text-gray-600">MwSt. %</th>
                    <th className="pb-2 border-b text-gray-600">Aktion</th>
                </tr>
            </thead>
            <tbody>
                {selectedProducts.map((product) => (
                    <tr key={product.id}>
                        <td className="py-2">{product.title}</td>
                        <td className="py-2">{product.price}€</td>
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
                        <td className="py-2">
                            <button
                                onClick={() => removeProduct(product.id)}
                                className="text-red-500"
                            >
                                Entfernen
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;
