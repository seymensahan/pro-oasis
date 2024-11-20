'use client'

import { FormEventHandler, useState } from 'react'
import { Plus, Store, Edit, Trash2, User } from 'lucide-react'

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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import StoreModal from './components/StoreModal'


export interface Store {
    id: number;
    name: string;
    description: string;
    address: string;
}

interface FormData {
    name: string;
    description: string;
    address: string;
}

// Mock data for existing stores
const initialStores = [
    { id: 1, name: "Downtown Boutique", description: "Fashion store in the heart of the city", address: "123 Main St, Cityville" },
    { id: 2, name: "Tech Haven", description: "Latest gadgets and electronics", address: "456 Innovation Ave, Techtown" },
]

export default function StoreManagement() {
    const [stores, setStores] = useState(initialStores)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingStore, setEditingStore] = useState<Store>()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editingStore) {
            setStores(stores.map(store =>
                store.id === editingStore.id ? { ...store, ...formData } : store
            ))
        } else {
            const newStore = {
                id: stores.length + 1,
                ...formData
            }
            setStores([...stores, newStore])
        }
        setIsDialogOpen(false)
        setEditingStore(undefined)
        setFormData({ name: '', description: '', address: '' })
    }

    const handleEdit = (store: Store) => {
        setEditingStore(store)
        setFormData(store)
        setIsDialogOpen(true)
    }

    const handleDelete = (id: number) => {
        setStores(stores.filter(store => store.id !== id))
    }

    return (
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Your Stores</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className=' bg-blue-400 hover:bg-blue-500' onClick={() => {
                            setEditingStore(undefined)
                            setFormData({ name: '', description: '', address: '' })
                        }}>
                            <Plus className="mr-2 h-4 w-4" /> Add New Store
                        </Button>
                    </DialogTrigger>
                    <StoreModal editingStore={editingStore}/>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {stores.map((store) => (
                    <Card key={store.id}>
                        <div className="flex justify-center items-center mt-5">
                            <img
                                src="/ProOasis-logo.webp"
                                className="w-auto h-20 rounded-full"
                                alt="Store logo"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Store className="mr-2 h-4 w-4" />
                                {store.name}
                            </CardTitle>
                            <CardDescription>{store.description}</CardDescription>
                            <CardDescription>{store.address}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-bold">Managers</p>
                            <Card className='flex items-center space-x-2 p-1 rounded-lg w-[30%] text-sm'>
                                <User className='w-4 h-4' />
                                <p>Jean Claude</p>
                            </Card>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(store)}>
                                <User className="mr-2 h-4 w-4" /> Add a manager
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(store)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    )
}