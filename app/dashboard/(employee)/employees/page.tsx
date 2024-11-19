'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Store, Eye } from 'lucide-react';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Types
interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    store: string;
}

interface Store {
    id: number;
    name: string;
}

// Mock data for employees and stores
const initialEmployees: Employee[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Manager", store: "Downtown Boutique" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Sales Associate", store: "Tech Haven" },
];

const stores: Store[] = [
    { id: 1, name: "Downtown Boutique" },
    { id: 2, name: "Tech Haven" },
];

const roles: string[] = ["Manager", "Sales Associate", "Cashier", "Stock Clerk"];

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isAssignStoreOpen, setIsAssignStoreOpen] = useState<boolean>(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [formData, setFormData] = useState<Partial<Employee>>({
        name: '',
        email: '',
        role: '',
    });
    const [assigningEmployee, setAssigningEmployee] = useState<Employee | null>(null);
    const [selectedStore, setSelectedStore] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingEmployee) {
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
                )
            );
        } else {
            const newEmployee: Employee = {
                id: employees.length + 1,
                ...formData,
                store: "Unassigned",
            } as Employee;
            setEmployees((prev) => [...prev, newEmployee]);
        }
        setIsDialogOpen(false);
        setEditingEmployee(null);
        setFormData({ name: '', email: '', role: '' });
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setFormData({
            name: employee.name,
            email: employee.email,
            role: employee.role,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    const handleAssignStore = (employee: Employee) => {
        setAssigningEmployee(employee);
        setSelectedStore(employee.store);
        setIsAssignStoreOpen(true);
    };

    const handleStoreAssignment = () => {
        if (assigningEmployee) {
            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.id === assigningEmployee.id ? { ...emp, store: selectedStore } : emp
                )
            );
        }
        setIsAssignStoreOpen(false);
        setAssigningEmployee(null);
        setSelectedStore('');
    };

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Employee Management</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className='bg-blue-400 hover:bg-blue-500'
                            onClick={() => {
                                setEditingEmployee(null);
                                setFormData({ name: '', email: '', role: '' });
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add New Employee
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingEmployee
                                    ? 'Make changes to employee information here.'
                                    : 'Enter the details of the new employee here.'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">
                                        Role
                                    </Label>
                                    <Select
                                        name="role"
                                        value={formData.role || ''}
                                        onValueChange={(value) =>
                                            setFormData((prev) => ({ ...prev, role: value }))
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    {role}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">
                                    {editingEmployee ? 'Save Changes' : 'Add Employee'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.role}</TableCell>
                            <TableCell>{employee.store}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Link href={`./employees/${encodeURIComponent(employee.name)}`}>
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(employee)}>
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleAssignStore(employee)}>
                                        <Store className="mr-2 h-4 w-4" /> Assign Store
                                    </Button>
                                    {/* <Button variant="destructive" size="sm" onClick={() => handleDelete(employee.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </Button> */}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isAssignStoreOpen} onOpenChange={setIsAssignStoreOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Assign Store</DialogTitle>
                        <DialogDescription>
                            Assign {assigningEmployee?.name} to a store.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="store" className="text-right">
                                Store
                            </Label>
                            <Select
                                value={selectedStore}
                                onValueChange={setSelectedStore}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a store" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stores.map((store) => (
                                        <SelectItem key={store.id} value={store.name}>
                                            {store.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleStoreAssignment}>Assign Store</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
