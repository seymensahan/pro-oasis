import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SupplyDataProps } from '@/lib/Types';
import { MoreVertical } from 'lucide-react';



type SuppliesTableProps = {
    supplies: SupplyDataProps[];
    onEdit: (supply: SupplyDataProps) => void;
};

export default function SuppliesTable({ supplies, onEdit }: SuppliesTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Supply</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {supplies.length > 0 ? (
                    supplies.map((supply) => (
                        <TableRow key={supply?.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={supply?.images?.[0]?.url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                        alt={supply?.supplyProduct || "Product Image"}
                                        className="h-10 w-10 rounded-full"
                                    />
                                    <span className="font-medium">{supply?.supplyProduct}</span>
                                </div>
                            </TableCell>
                            <TableCell>{supply?.category}</TableCell>
                            <TableCell>{supply?.purchasePrice}</TableCell>
                            <TableCell>{supply?.unit}</TableCell>
                            <TableCell>{supply?.quantityPurchased}</TableCell>
                            <TableCell>{supply?.supplier}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="button-icon">
                                            <MoreVertical />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => onEdit(supply)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Place Order</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={10} className="text-center py-4">
                            No Supply data available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
