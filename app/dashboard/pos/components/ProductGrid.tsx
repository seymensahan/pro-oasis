
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProductDataProps } from '@/lib/Types';

interface ProductGridProps {
    products: ProductDataProps[];
    addToCart: (product: ProductDataProps) => void;
}

const ProductGrid = ({ products, addToCart }: ProductGridProps) => {
    const [filteredProducts, setFilteredProducts] = useState<ProductDataProps[]>(products);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Handle category filtering
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.category.toLowerCase() === selectedCategory.toLowerCase()
                )
            );
        }
    }, [selectedCategory, products]);

    return (
        <div className="flex-1 p-4">
            <h1 className="font-bold text-2xl mb-4">Products</h1>

            {/* Category Filter */}
            <div className="mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <Card
                        key={product.id}
                        className="cursor-pointer h-54 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden"
                        onClick={() => addToCart(product)}
                    >
                        <CardContent className="p-4 flex flex-col items-center">
                            <img
                                src={product?.images?.[0]?.url}
                                alt={product.name}
                                className="w-full h-32 object-cover mb-4 rounded"
                            />
                            <h3 className="font-medium text-md text-center truncate w-full">
                                {product.name}
                            </h3>
                            <div className="flex justify-between mt-3 w-full">
                                <p className="text-xs text-gray-600">{product.stock} {product.unit}</p>
                                <p className="text-xs font-semibold text-green-800">
                                    {product.price} FCFA
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
