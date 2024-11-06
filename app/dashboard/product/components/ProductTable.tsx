import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react';
import { ProductDataProps } from '@/lib/Types';
import Link from 'next/link'; // Import Link from Next.js
import useGetProducts from '../hooks/useGetProducts';

interface ProductTableProps {
    products: ProductDataProps[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    const { deleteProductByName } = useGetProducts()

    const deleteProduct = async (id: string) => {
        await deleteProductByName(id)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12">
                        <Checkbox />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>
                        <div className="flex items-center">
                            Category
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center">
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center">
                            Unit
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center">
                            Qty
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center">
                            Description
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="space-y-5">
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={product?.images?.[0]?.url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                    alt={product?.name || "Product Image"}
                                    className="h-10 w-10 rounded-full"
                                />
                                <span>{product.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price} FCFA</TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <span>{product.description}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                {/* Wrap "View" button in Link for routing */}
                                <Link href={`./product/${encodeURIComponent(product.name)}`}>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className='hover:bg-red-50' onClick={() => deleteProduct(product.name)}>
                                    <Trash2 className="h-4 w-4 text-red-500 " />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
