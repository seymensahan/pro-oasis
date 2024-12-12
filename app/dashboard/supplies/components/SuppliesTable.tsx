import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SupplyDataProps } from '@/lib/Types';
import { MoreVertical } from 'lucide-react';
import formatDate from '@/lib/FormatDate';

type SuppliesTableProps = {
    supplies: SupplyDataProps[];
    onEdit: (supply: SupplyDataProps) => void;
};

// Reusable action menu component
const ActionMenu = ({ onEdit, supply }: { onEdit: (supply: SupplyDataProps) => void; supply: SupplyDataProps }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="button-icon">
                <MoreVertical />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(supply)}>Edit</DropdownMenuItem>
            {/* <DropdownMenuItem>Place Order</DropdownMenuItem> */}
        </DropdownMenuContent>
    </DropdownMenu>
);

export default function SuppliesTable({ supplies, onEdit }: SuppliesTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Supply</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {supplies.length > 0 ? (
                    supplies.map((supply) => {
                        if (!supply) return null; // Skip invalid supplies
                        const { id, images, supplyProduct, createAt, purchasePrice, unit, status,  quantityPurchased, supplier } = supply;
                        return (
                            <TableRow key={id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={images?.[0]?.url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                                            alt={supplyProduct || "Product Image"}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <span className="font-medium">{supplyProduct}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(createAt)}</TableCell>
                                <TableCell>{purchasePrice}</TableCell>
                                <TableCell>{unit}</TableCell>
                                <TableCell>{quantityPurchased}</TableCell>
                                <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            status === 'not delivered' ? 'bg-yellow-100 text-yellow-800' :
                                            status === 'partially delivered' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {supply.status}
                                        </span>
                                    </TableCell>
                                <TableCell>{supplier}</TableCell>
                                <TableCell className="text-right">
                                    <ActionMenu onEdit={onEdit} supply={supply} />
                                </TableCell>
                            </TableRow>
                        );
                    })
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
