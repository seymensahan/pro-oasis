// src/components/EmployeeManagement.tsx

'use client';

import { useState, useReducer } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmployee, { EmployeeType } from './hooks/useEmployee';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeTable } from './components/EmployeeTable';
import { StoreAssignmentDialog } from './components/StoreAssignmentDialog';
import useAuth from '@/app/(auth)/Hooks/useAuth';

// Sample Data
const stores = [
    { id: 1, name: "Downtown Boutique" },
    { id: 2, name: "Tech Haven" },
];
const roles = ["Manager", "Sales Associate", "Cashier", "Stock Clerk"];

// Reducer for State Management
type Action =
    | { type: 'ADD_EMPLOYEE'; payload: EmployeeType }
    | { type: 'EDIT_EMPLOYEE'; payload: EmployeeType }
    | { type: 'ASSIGN_STORE'; payload: { id: string; store: string } };

function employeeReducer(state: EmployeeType[], action: Action): EmployeeType[] {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return [...state, { ...action.payload, store: 'Unassigned', sales: [] }];
        case 'EDIT_EMPLOYEE':
            return state.map(emp => (emp.id === action.payload.id ? { ...emp, ...action.payload } : emp));
        case 'ASSIGN_STORE':
            return state.map(emp => (emp.id === action.payload.id ? { ...emp, store: action.payload.store } : emp));
        default:
            return state;
    }
}

export default function EmployeeManagement() {
    const [employees, dispatch] = useReducer(employeeReducer, []);
    const [dialogState, setDialogState] = useState({ isOpen: false, editingEmployee: null as EmployeeType | null });
    const [assignState, setAssignState] = useState({ isOpen: false, assigningEmployee: null as EmployeeType | null });
    const { user } = useAuth();
    const { addEmployee } = useEmployee();

    const handleAddEmployee = (employee: EmployeeType) => {
        addEmployee(employee);
        dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
    };

    const handleEditEmployee = (employee: EmployeeType) => {
        dispatch({ type: 'EDIT_EMPLOYEE', payload: employee });
    };

    const handleAssignStore = (id: string, store: string) => {
        dispatch({ type: 'ASSIGN_STORE', payload: { id, store } });
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Employee Management</h1>
                <Button
                    className="bg-blue-400 hover:bg-blue-500"
                    onClick={() => setDialogState({ isOpen: true, editingEmployee: null })}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New Employee
                </Button>
            </div>

            <EmployeeTable
                employees={employees}
                onEdit={(employee) => setDialogState({ isOpen: true, editingEmployee: employee })}
                onAssignStore={(employee) => setAssignState({ isOpen: true, assigningEmployee: employee })}
            />

            <EmployeeForm
                isOpen={dialogState.isOpen}
                employee={dialogState.editingEmployee}
                roles={roles}
                onClose={() => setDialogState({ isOpen: false, editingEmployee: null })}
                onSubmit={(employee) => {
                    dialogState.editingEmployee ? handleEditEmployee(employee) : handleAddEmployee(employee);
                }}
            />

            <StoreAssignmentDialog
                isOpen={assignState.isOpen}
                stores={stores}
                employee={assignState.assigningEmployee}
                onClose={() => setAssignState({ isOpen: false, assigningEmployee: null })}
                onAssign={handleAssignStore}
            />
        </div>
    );
}
