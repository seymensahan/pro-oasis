import React from 'react';
import { Product } from '@/app/dashboard/product/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react';

interface ProductTableProps {
    products: Product[];
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
                    <TableHead>
                        SKU
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead>
                    <TableHead>
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead>
                    <TableHead>
                        Brand
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead>
                    <TableHead>
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead>
                    <TableHead>
                        Unit
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead>
                    <TableHead>
                        Qty
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </TableHead>
                    <TableHead>
                        Created by
                        <ArrowUpDown className="ml-2 h-4 w-4" />
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
                                    src={product.image}
                                    alt={product.name}
                                    className="h-10 w-10 rounded-full"
                                />
                                <span>{product.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell>{product.qty}</TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <img
                                    src={product.createdBy.avatar}
                                    alt={product.createdBy.name}
                                    className="h-8 w-8 rounded-full"
                                />
                                <span>{product.createdBy.name}</span>
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
