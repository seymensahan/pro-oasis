import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { categories } from '../data'

interface CategorySelectorProps {
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

const CategorySelector = ({ selectedCategory, setSelectedCategory }: CategorySelectorProps) => (
    <div className="p-4">
        <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                {/* ChevronLeft icon */}
            </button>
            <div className="flex space-x-4 px-8 overflow-x-auto">
                {categories.map(category => (
                    <Card
                        key={category.id}
                        className={`flex-none cursor-pointer p-4 ${selectedCategory === category.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <CardContent className="flex flex-col items-center p-2">
                            <img src={category.icon} alt={category.name} className="w-10 h-10 mb-2" />
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-xs text-gray-500">{category.items} Items</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2">
                {/* ChevronRight icon */}
            </button>
        </div>
    </div>
)

export default CategorySelector
