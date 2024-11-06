'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Printer } from "lucide-react"
import Image from "next/image"
import useGetProducts from "../hooks/useGetProducts"
import { useEffect } from "react"

interface ProductDetails {
    id: string
    barcode: string
    name: string
    category: string
    subCategory: string
    brand: string
    unit: string
    sku: string
    minimumQty: number
    quantity: number
    tax: number
    image: string
}

const productDetails: ProductDetails = {
    id: '1',
    barcode: '86102192',
    name: 'Macbook pro',
    category: 'Computers',
    subCategory: 'None',
    brand: 'None',
    unit: 'Piece',
    sku: 'PT0001',
    minimumQty: 5,
    quantity: 50,
    tax: 0.00,
    image: '/placeholder.svg?height=400&width=400'
}

interface ParamsProps {
    params: {
        name: string;
    };
}

export default function ProductDetailsPage({ params }: ParamsProps) {

    const productName = decodeURIComponent(params.name);

    const { getProductByName, selectedProductData } = useGetProducts()

    useEffect(() => {
        getProductByName(productName)
    }, [])


    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Product Details  {selectedProductData?.name}</h1>
                <p className="text-muted-foreground">Full details of a product</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="p-3">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium w-1/3">Product</TableCell>
                                        <TableCell>{selectedProductData?.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Category</TableCell>
                                        <TableCell>{selectedProductData?.category}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell className="font-medium">Brand</TableCell>
                                        <TableCell>{selectedProductData.brand}</TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell className="font-medium">Unit</TableCell>
                                        <TableCell>{selectedProductData?.unit}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell className="font-medium">SKU</TableCell>
                                        <TableCell>{selectedProductData.sku}</TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell className="font-medium">Unit Price</TableCell>
                                        <TableCell>{selectedProductData?.price} FCFA</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Quantity</TableCell>
                                        <TableCell>{selectedProductData?.stock}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Description</TableCell>
                                        <TableCell>{selectedProductData?.description}%</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                            <Image
                                src={selectedProductData?.images?.[0]?.url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                alt={"product image"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                            <p>{selectedProductData?.name}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}