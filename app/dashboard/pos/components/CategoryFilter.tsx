interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    selectedCategory,
    onCategoryChange,
}) => {
    return (
        <div className="mb-4">
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="all">All Categories</option>
                {/* Example categories, replace with dynamic ones if needed */}
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
            </select>
        </div>
    );
};

export default CategoryFilter;
