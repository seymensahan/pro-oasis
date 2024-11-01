import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Product } from '@/app/types'

interface ProductGridProps {
    products: Product[]
    selectedCategory: string
    addToCart: (product: Product) => void
}

const ProductGrid = ({ products, selectedCategory, addToCart }: ProductGridProps) => (
    <div className="flex-1 p-4">
        <h1 className='font-bold font-'>Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products
                .filter(product => selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory)
                .map(product => (
                    <Card key={product.id} className="cursor-pointer" onClick={() => addToCart(product)}>
                        <CardContent className="p-4">
                            <img src={product.image} alt={product.productName} className="w-full h-32 object-contain mb-2" />
                            <h3 className="font-medium text-md">{product.productName}</h3>
                            <div className="flex justify-between mt-3 w-full">
                                <p className="text-xs">{product.quantity} Pcs</p>
                                <p className="text-xs text-green-800">{product.price} FCFA</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    </div>
)

export default ProductGrid
