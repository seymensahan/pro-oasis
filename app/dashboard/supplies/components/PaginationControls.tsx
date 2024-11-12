import { Button } from '@/components/ui/button';

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
    return (
        <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                <Button variant="outline" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </div>
    );
}
