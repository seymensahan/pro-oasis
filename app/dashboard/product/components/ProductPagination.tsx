import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (pageNumber: number) => void
}

const ProductPagination: React.FC<ProductPaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
            >
                Previous
            </Button>
            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
            >
                Next
            </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                </p>
            </div>
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="rounded-l-md"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {[...Array(totalPages)].map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => onPageChange(index + 1)}
                            variant={index + 1 === currentPage ? 'default' : 'outline'}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                index + 1 === currentPage ? 'bg-blue-500 text-white' : 'text-gray-900'
                            } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="rounded-r-md"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </nav>
            </div>
        </div>
    </div>
)

export default ProductPagination
