import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, ChevronDown } from 'lucide-react'

interface SalesSearchAndFilterProps {
    setSearchTerm: (term: string) => void
}

const SalesSearchAndFilter: React.FC<SalesSearchAndFilterProps> = ({ setSearchTerm }) => (
    <div className="flex justify-between items-center mb-4">
        <div className="relative">
            <Input
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4 text-orange-500" />
            </Button>
            <Button variant="outline">
                Newest
                <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
    </div>
)

export default SalesSearchAndFilter
