import React from 'react';
import { Product } from '@/app/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react';
import { ProductDataProps } from '@/lib/Types';

interface ProductTableProps {
    products: ProductDataProps[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12">
                        <Checkbox />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    {/* <TableHead>
                        SKU
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead> */}
                    <TableHead>
                        <div className="flex items-center">
                            Category
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    {/* <TableHead>
                        <div className="flex items-center">
                            Brand
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead> */}
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
                        {/* <TableCell>{product.userId}</TableCell> */}
                        <TableCell>{product.category}</TableCell>
                        {/* <TableCell>{product.brand}</TableCell> */}
                        <TableCell>{product.price} FCFA</TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                {/* Commented out createdBy.avatar */}
                                {/* <img
                                    src={product.createdBy.avatar}
                                    alt={product.createdBy.name}
                                    className="h-8 w-8 rounded-full"
                                /> */}
                                <span>{product.description}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
