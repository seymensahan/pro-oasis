import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ProductDataProps } from '@/lib/Types'

interface ProductGridProps {
    products: ProductDataProps[]
    selectedCategory: string
    addToCart: (product: ProductDataProps) => void
}

const ProductGrid = ({ products, selectedCategory, addToCart }: ProductGridProps) => (
    <div className="flex-1 p-4">
        <h1 className="font-bold text-2xl mb-4">Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products
                .filter(
                    product =>
                        selectedCategory === 'all' ||
                        product.category.toLowerCase() === selectedCategory
                )
                .map(product => (
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

)

export default ProductGrid
