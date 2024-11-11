import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Pencil, Trash2 } from 'lucide-react';
import { ServiceDataProps } from '@/lib/Types';
import Link from 'next/link';

interface ServiceTableProps {
    services: ServiceDataProps[];
}


export const ServiceTable = ({ services }: ServiceTableProps) => {


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
                    {/* <TableHead>
                        <div className="flex items-center">
                            requirements
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead> */}
                    <TableHead>
                        <div className="flex items-center">
                            Duration
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className="flex items-center">
                            Delivery Method
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
                            Availiability
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                    </TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="space-y-5">
                {services.map((service) => (
                    <TableRow key={service.id}>
                        <TableCell>
                            <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={service?.images?.[0]?.url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                    alt={service?.name || "Product Image"}
                                    className="h-10 w-10 rounded-full"
                                />
                                <span>{service.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{service.category}</TableCell>
                        {/* <TableCell>
                            <div className="flex items-center space-x-2">
                                <span>{service.requirements}</span>
                            </div>
                        </TableCell> */}
                        <TableCell>{service.duration} Hrs</TableCell>
                        <TableCell>{service.deliveryMethod}</TableCell>
                        <TableCell>{service.price} FCFA</TableCell>
                        <TableCell>{service.availability}</TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                {/* Wrap "View" button in Link for routing */}
                                <Link href={`./product/${encodeURIComponent(service.name)}`}>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                {/* <Button variant="ghost" size="icon" className='hover:bg-red-50' onClick={() => deleteProduct(product.name)}>
                                    <Trash2 className="h-4 w-4 text-red-500 " />
                                </Button> */}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
