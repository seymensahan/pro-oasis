import React from 'react'
import { Button } from "@/components/ui/button"
import { Download, Printer, RefreshCw, Upload, FileText } from 'lucide-react'

const SalesHeader = () => (
    <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold">Sales List</h1>
            <p className="text-sm text-gray-600">Manage Your Sales</p>
        </div>
        <div className="flex space-x-2">
            <Button variant="outline" size="icon">
                <FileText className="h-4 w-4 text-red-500" />
            </Button>
            <Button variant="outline" size="icon">
                <Download className="h-4 w-4 text-green-500" />
            </Button>
            <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
            </Button>
            <Button>
                <Upload className="h-4 w-4 mr-2" />
                Add New Sales
            </Button>
        </div>
    </div>
)

export default SalesHeader
