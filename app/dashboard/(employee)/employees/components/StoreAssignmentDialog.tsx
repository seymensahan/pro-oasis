import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { EmployeeType } from '../hooks/useEmployee';

interface Store {
    id: number;
    name: string;
}

interface Props {
    isOpen: boolean;
    employee: EmployeeType | null;
    stores: Store[];
    onClose: () => void;
    onAssign: (id: string, store: string) => void;
}

export function StoreAssignmentDialog({ isOpen, employee, stores, onClose, onAssign }: Props) {
    const [selectedStore, setSelectedStore] = useState(employee?.store || '');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Store</DialogTitle>
                </DialogHeader>
                <Select
                    onValueChange={setSelectedStore}
                    defaultValue={selectedStore || ''}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Store" />
                    </SelectTrigger>
                    <SelectContent>
                        {stores.map((store) => (
                            <SelectItem key={store.id} value={store.name}>
                                {store.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            if (employee) onAssign(employee.id!, selectedStore);
                            onClose();
                        }}
                    >
                        Assign Store
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
