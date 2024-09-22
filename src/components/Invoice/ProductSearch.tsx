import React, { useState, useEffect } from "react";

interface ProductSearchProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
    products,
    onProductSelect,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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

    return (
        <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
                Produkt suchen
            </label>
            <input
                type="text"
                placeholder="Produkt suchen..."
                className="w-full px-4 py-3 border rounded-lg"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredProducts.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto">
                    {filteredProducts.map((product) => (
                        <li
                            key={product.id}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => onProductSelect(product)}
                        >
                            {product.title} - {product.price}€
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductSearch;
