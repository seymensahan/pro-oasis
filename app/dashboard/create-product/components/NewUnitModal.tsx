import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'
import React, { useState } from 'react'
import { ModalProps } from '../../../../lib/Types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import useUnit from '../hooks/useUnit'

const NewUnitModal = ({ isOpen, onClose }: ModalProps) => {
    const [unit, setUnit] = useState<string>("")
    const { addUnit, loading } = useUnit()

    // Handle submission
    const handleSubmit = async () => {
        if (!unit.trim()) {
            toast.error("Category name cannot be empty")
            return
        }

        // Attempt to add the category
        try {
            await addUnit({ name: unit })
            // toast.success("Category added successfully")
            setUnit("")
            onClose() // Close the modal
        } catch (error) {
            toast.error(`Failed to add unit: ${error}`)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[400px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add New Unit</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="p-4 space-y-4">
                    <div>
                        <Label>Unit name</Label>
                        <Input
                            id="category"
                            placeholder="Enter category name"
                            type="text"
                            name="category"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
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

export default NewUnitModal