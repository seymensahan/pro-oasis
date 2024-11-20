'use client'

import { useState, FormEvent } from 'react'
import { Plus, Store, Edit2, User, UserPlus, MapPin, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import StoreModal from './components/StoreModal'
import { Badge } from '@/components/ui/badge'
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface Store {
    id: number;
    name: string;
    description: string;
    address: string;
    logo: string;
    managers: Manager[];
    isActive: boolean;
}

interface Manager {
    name: string;
    role: string;
}

interface FormData {
    name: string;
    description: string;
    address: string;
}

const availableManagers = [
    "Jean Claude",
    "Marie Smith",
    "John Doe",
    "Sarah Johnson"
]

// Available roles
const roles = [
    "Store Manager",
    "Assistant Manager",
    "Shift Supervisor",
    "Sales Associate"
]

const initialStores: Store[] = [
    {
        id: 1,
        name: "Downtown Boutique",
        description: "Fashion store in the heart of the city",
        address: "123 Main St, Cityville",

        
        logo: "/ProOasis-logo.webp",
        managers: [
            { name: "Jean Claude", role: "Store Manager" },
            { name: "Marie Smith", role: "Assistant Manager" }
        ],
        isActive: true
    },
    {
        id: 2,
        name: "Tech Haven",
        description: "Latest gadgets and electronics",
        address: "456 Innovation Ave, Techtown",
        logo: "/ProOasis-logo.webp",
        managers: [
            { name: "John Doe", role: "Store Manager" }
        ],
        isActive: true
    }
]

export default function StoreManagement() {
    const [stores, setStores] = useState<Store[]>(initialStores)
    const [isNewStoreOpen, setIsNewStoreOpen] = useState(false)
    const [isManagerDialogOpen, setIsManagerDialogOpen] = useState(false)
    const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
    const [selectedStore, setSelectedStore] = useState<Store | null>(null)
    const [selectedManager, setSelectedManager] = useState<Manager | null>(null)
    const [isEditMode, setIsEditMode] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        address: '',
    })

    const handleStoreSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (isEditMode && selectedStore) {
            setStores(stores.map(store =>
                store.id === selectedStore.id
                    ? { ...store, ...formData }
                    : store
            ))
        } else {
            const newStore: Store = {
                id: stores.length + 1,
                ...formData,
                logo: "/placeholder.svg",
                managers: [],
                isActive: true
            }
            setStores([...stores, newStore])
        }
        setIsNewStoreOpen(false)
        setFormData({ name: '', description: '', address: '' })
        setIsEditMode(false)
    }

    const handleEditStore = (store: Store) => {
        setSelectedStore(store)
        setFormData({
            name: store.name,
            description: store.description,
            address: store.address,
        })
        setIsEditMode(true)
        setIsNewStoreOpen(true)
    }

    const handleAddManager = (store: Store) => {
        setSelectedStore(store)
        setIsManagerDialogOpen(true)
    }

    const handleManagerSelect = (managerName: string) => {
        if (selectedStore) {
            setStores(stores.map(store =>
                store.id === selectedStore.id
                    ? { ...store, managers: [...store.managers, { name: managerName, role: "Sales Associate" }] }
                    : store
            ))
        }
        setIsManagerDialogOpen(false)
    }

    const handleRemoveManager = (storeId: number, managerName: string) => {
        setStores(stores.map(store =>
            store.id === storeId
                ? { ...store, managers: store.managers.filter(m => m.name !== managerName) }
                : store
        ))
    }

    const handleRoleChange = (store: Store, manager: Manager) => {
        setSelectedStore(store)
        setSelectedManager(manager)
        setIsRoleDialogOpen(true)
    }

    const handleRoleSelect = (role: string) => {
        if (selectedStore && selectedManager) {
            setStores(stores.map(store =>
                store.id === selectedStore.id
                    ? {
                        ...store,
                        managers: store.managers.map(m =>
                            m.name === selectedManager.name ? { ...m, role } : m
                        )
                    }
                    : store
            ))
        }
        setIsRoleDialogOpen(false)
    }

    const toggleStoreActivity = (storeId: number) => {
        setStores(stores.map(store =>
            store.id === storeId
                ? { ...store, isActive: !store.isActive }
                : store
        ))
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Your Stores</h1>
                <Dialog open={isNewStoreOpen} onOpenChange={setIsNewStoreOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-blue-400 hover:bg-blue-500"
                            onClick={() => {
                                setSelectedStore(null)
                                setFormData({ name: '', description: '', address: '' })
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add New Store
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Store" : "New Store"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleStoreSubmit}>
                            <div>
                                <Label htmlFor="name">Store Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit">{isEditMode ? "Save Changes" : "Add Store"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {stores.map((store) => (
                    <Card key={store.id} className={`overflow-hidden ${store.isActive ? '' : 'opacity-60'}`}>
                        <CardHeader className="border-b bg-muted/50 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-lg overflow-hidden">
                                        <img
                                            src={store.logo}
                                            alt={store.name}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            <Store className="h-5 w-5" />
                                            {store.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">{store.description}</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={store.isActive}
                                    onCheckedChange={() => toggleStoreActivity(store.id)}
                                    aria-label="Toggle store activity"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{store.address}</span>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Managers</h3>
                                <div className="space-y-2">
                                    {store.managers.map((manager) => (
                                        <Badge key={manager.name} variant="secondary" className="flex items-center gap-2 w-fit">
                                            <User className="h-3 w-3" />
                                            {manager.name} - {manager.role}
                                            <button
                                                onClick={() => handleRoleChange(store, manager)}
                                                className="ml-1 hover:text-primary"
                                            >
                                                <Edit2 className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveManager(store.id, manager.name)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2 ">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddManager(store)}
                                >
                                    <UserPlus className="mr-2 h-4 w-4" /> Add Manager
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditStore(store)}
                                >
                                    <Edit2 className="mr-2 h-4 w-4" /> Edit Store
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isManagerDialogOpen} onOpenChange={setIsManagerDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Manager</DialogTitle>
                        <DialogDescription>
                            Select a manager to add to this store.
                        </DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={handleManagerSelect}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a manager" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableManagers
                                .filter(manager => !selectedStore?.managers.some(m => m.name === manager))
                                .map((manager) => (
                                    <SelectItem key={manager} value={manager}>
                                        {manager}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </DialogContent>
            </Dialog>

            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change Role</DialogTitle>
                        <DialogDescription>
                            Select a new role for {selectedManager?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={handleRoleSelect}>
                        <SelectTrigger>
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
                </DialogContent>
            </Dialog>
        </div>
    )
}
