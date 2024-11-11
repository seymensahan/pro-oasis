'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, DollarSign, Users, ShoppingCart, ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import DashboardStats from './components/DashboardStats'

const salesData = [
    { name: 'Jan', sales: 200, purchase: 120 },
    { name: 'Feb', sales: 250, purchase: 150 },
    { name: 'Mar', sales: 300, purchase: 200 },
    { name: 'Apr', sales: 280, purchase: 180 },
    { name: 'May', sales: 320, purchase: 220 },
    { name: 'Jun', sales: 350, purchase: 250 },
    { name: 'Jul', sales: 380, purchase: 280 },
]

const recentTransactions = [
    { id: 1, product: 'Lobar Handy', time: '15 Mins', payment: 'Paypal', paymentId: '#416645453773', amount: 1099.00, status: 'Completed' },
    { id: 2, product: 'Red Premium Handy', time: '10 Mins', payment: 'Apple Pay', paymentId: '#147784454554', amount: 600.55, status: 'Pending' },
    { id: 3, product: 'iPhone 14 Pro', time: '8 Mins', payment: 'Stripe', paymentId: '#558974121557', amount: 1299.99, status: 'Completed' },
]

const bestSellers = [
    { id: 1, name: 'Lenovo 3rd Generation', price: 4420, sales: 6547, image: '/placeholder.svg?height=50&width=50' },
    { id: 2, name: 'Bold V3.2', price: 1474, sales: 3474, image: '/placeholder.svg?height=50&width=50' },
    { id: 3, name: 'Nike Jordan', price: 8784, sales: 1478, image: '/placeholder.svg?height=50&width=50' },
]

const stats =[
    { title: "Total Revenue", amount: 12231, progress: "+20.1% from last month", icon: DollarSign},
    { title: "New Customers", amount: 2345, progress: "+15.3% from last month", icon: Users},
    { title: "Total Orders", amount: 5678, progress: "+12.7% from last month", icon: ShoppingCart},
    { title: "Total Sales", amount: 21456, progress: "+18.2% from last month", icon: ArrowUpRight},
]

export default function Dashboard() {
    const { user } = useAuth();


    console.log("user info: ", user)

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-4">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome back, {user?.displayName}</h1>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <DashboardStats title={stat.title} amount={stat.amount} progress={stat.progress} icon={<stat.icon />} />
                        ))}
                    
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sales Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="purchase" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex justify-between items-center">
                                <CardTitle>Best Sellers</CardTitle>
                                <Button variant="ghost" className="text-sm">
                                    View All <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Sales</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bestSellers.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center">
                                                        <img src={product.image} alt={product.name} className="w-8 h-8 mr-2 rounded" />
                                                        {product.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{product.price} FCFA</TableCell>
                                                <TableCell>{product.sales}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader className="flex justify-between items-center">
                            <CardTitle>Recent Transactions</CardTitle>
                            <Button variant="ghost" className="text-sm">
                                View All <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order Details</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{transaction.product}</div>
                                                    <div className="text-sm text-gray-500">{transaction.time} ago</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div>{transaction.payment}</div>
                                                    <div className="text-sm text-gray-500">{transaction.paymentId}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {transaction.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{transaction.amount.toFixed(2)} FCFA</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}