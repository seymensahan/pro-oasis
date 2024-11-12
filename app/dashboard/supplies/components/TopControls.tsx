import { Button } from '@/components/ui/button';
import { Plus, Download, Upload, Printer, RotateCcw } from 'lucide-react';

type TopControlsProps = {
    onAddNew: () => void;
};

export default function TopControls({ onAddNew }: TopControlsProps) {
    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">Supplies Management</h1>
                <p className="text-gray-600">Manage your supplies and place orders</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon"><Download /></Button>
                <Button variant="outline" size="icon"><Upload /></Button>
                <Button variant="outline" size="icon"><Printer /></Button>
                <Button variant="outline" size="icon"><RotateCcw /></Button>
                <Button onClick={onAddNew}  className='bg-blue-400 hover:bg-blue-500'><Plus /> Add New Supply</Button>
            </div>
        </div>
    );
}
