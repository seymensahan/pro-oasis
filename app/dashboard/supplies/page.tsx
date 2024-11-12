// SuppliesPage.tsx
"use client";

import { useState } from 'react';
import TopControls from './components/TopControls';
import SuppliesTable from './components/SuppliesTable';
import { FormData, Supply, SupplyDataProps } from '@/lib/Types';
import PaginationControls from './components/PaginationControls';
import SupplyFormDialog from './components/SupplyFormDialog';
import useSaveSupply from './hooks/useSaveSupply';
import SupplyComponent from './hooks/useGetSupplyData';

// Mock data for supplies
const allSupplies: Supply[] = [
    { id: 1, name: "Paper Towels", image: "/placeholder.svg", category: "Cleaning", price: "5000 FCFA", unit: "Pack", qty: 50, supplier: "CleanCo" },
    { id: 2, name: "Printer Paper", image: "/placeholder.svg", category: "Office", price: "3000 FCFA", unit: "Ream", qty: 100, supplier: "OfficeSupplies Inc" },
    { id: 3, name: "Hand Soap", image: "/placeholder.svg", category: "Cleaning", price: "2000 FCFA", unit: "Bottle", qty: 30, supplier: "CleanCo" },
    { id: 4, name: "Pens", image: "/placeholder.svg", category: "Office", price: "500 FCFA", unit: "Box", qty: 20, supplier: "OfficeSupplies Inc" },
    { id: 5, name: "Trash Bags", image: "/placeholder.svg", category: "Cleaning", price: "4000 FCFA", unit: "Roll", qty: 40, supplier: "CleanCo" },
]



export default function SuppliesPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedSupply, setSelectedSupply] = useState<SupplyDataProps | null>(null);
    const [formData, setFormData] = useState<FormData>({
        productName: '',
        quantityPurchased: '',
        supplier: '',
    });

    const { supply } = SupplyComponent()

    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSupplies = supply.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(supply.length / itemsPerPage);

    const handleAddNew = () => {
        setSelectedSupply(null);
        setFormData({ productName: '', quantityPurchased: '', supplier: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (supply: SupplyDataProps) => {
        setSelectedSupply(supply);
        setFormData({ productName: supply.supplyProduct, category: supply.category, unit: supply.unit, quantityPurchased: supply.quantityPurchased, supplier: supply.supplier });
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-6">
            <TopControls onAddNew={handleAddNew} />
            <SuppliesTable supplies={currentSupplies} onEdit={handleEdit} />
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <SupplyFormDialog
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                setFormData={setFormData}
                selectedSupply={selectedSupply}
            />
        </div>
    );
}
