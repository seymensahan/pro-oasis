import React, { useState } from 'react'
import { ModalProps } from '../../../../lib/Types'
import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import useCategory from '../hooks/useCategory'
import { toast } from 'react-toastify' // Ensure toast notifications for success/error messages

const NewCategoryModal = ({ isOpen, onClose }: ModalProps) => {
    const [categoryName, setCategoryName] = useState<string>("")
    const { addCategory, loading } = useCategory()

    // Handle submission
    const handleSubmit = async () => {
        if (!categoryName.trim()) {
            toast.error("Category name cannot be empty")
            return
        }
        
        // Attempt to add the category
        try {
            await addCategory({ name: categoryName })
            // toast.success("Category added successfully")
            setCategoryName("") 
            onClose() // Close the modal
        } catch (error) {
            toast.error(`Failed to add category: ${error}`)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[400px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add New Category</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-4 space-y-4">
                    <div>
                        <Label>Category name</Label>
                        <Input
                            id="category"
                            placeholder="Enter category name"
                            type="text"
                            name="category"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-5">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-400"
                            size="sm"
                            onClick={handleSubmit}
                            disabled={loading} 
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>Add Category</>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCategoryModal
