"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ShoppingCart,
    LayoutDashboard,
    PieChart,
    BarChart2,
    Package,
    Briefcase,
    Layers,
    Tag,
    Box,
    FileText,
    ChevronRight,
    ChevronDown,
    Flag,
    Search,
    Maximize2,
    Bell,
    Users,
    Settings,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/LogoutButton";

interface AdminLayoutProps {
    children: React.ReactNode;
}

// Sidebar data object to avoid repetition
const sidebarData = [
    {
        title: "Main",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            // { icon: PieChart, label: "Admin Dashboard", href: "/admin-dashboard" },
            // { icon: BarChart2, label: "Sales Dashboard", href: "/sales-dashboard" },
        ],
    },
    {
        title: "Inventory",
        items: [
            { icon: Package, label: "Products", href: "/dashboard/product" },
            { icon: Box, label: "Create Product", href: "/dashboard/create-product" },
            { icon: FileText, label: "Expired Products", href: "/expired-products" },
            { icon: BarChart2, label: "Low Stocks", href: "/low-stocks" },
            { icon: Layers, label: "Category", href: "/category" },
            { icon: Tag, label: "Sub Category", href: "/sub-category" },
            { icon: ShoppingCart, label: "Brands", href: "/brands" },
            { icon: Box, label: "Units", href: "/units" },
        ],
    },
    {
        title: "Store",
        items: [
            { icon: Package, label: "Manage Stock", href: "/dashboard/stock" },
            { icon: Box, label: "Stock Adjustment", href: "/dashboard/stock-ajustment" },
        ],
    },
    {
        title: "Sales",
        items: [
            { icon: Package, label: "Sales", href: "/dashboard/sales" },
            { icon: Box, label: "Invoice", href: "/dashboard/invoice" },
        ],
    },
    {
        title: null,
        items: [
            {
                icon: Briefcase,
                label: "Application",
                href: "#",
                hasChevron: true,
            },
        ],
    },
];

export default function DashboardLayout({ children }: AdminLayoutProps) {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md overflow-y-auto">
                <div className="p-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShoppingCart className="h-8 w-8 text-orange-500" />
                        <span className="text-2xl font-bold">Pro Oasis</span>
                    </Link>
                </div>
                <nav className="mt-8">
                    {sidebarData.map((section, index) => (
                        <div key={index}>
                            {section.title && (
                                <div className="px-4 py-2 text-gray-500 uppercase text-xs font-semibold">
                                    {section.title}
                                </div>
                            )}
                            {section.items.map((item, itemIndex) => (
                                <Link
                                    key={itemIndex}
                                    href={item.href}
                                    className="flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                                >
                                    <div className="flex items-center space-x-2 text-sm">
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4 flex-1">
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Package className="h-5 w-5" />
                                </Button>
                                <div
                                    className={`relative flex-1 ${isSearchExpanded ? "max-w-3xl" : "max-w-xl"
                                        } transition-all duration-300`}
                                >
                                    <Input
                                        type="search"
                                        placeholder="Search"
                                        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                                        onFocus={() => setIsSearchExpanded(true)}
                                        onBlur={() => setIsSearchExpanded(false)}
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="flex items-center space-x-2">
                                            <Flag className="h-5 w-5" />
                                            <span>Select Store</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>Store 1</DropdownMenuItem>
                                        <DropdownMenuItem>Store 2</DropdownMenuItem>
                                        <DropdownMenuItem>Store 3</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <img
                                                src="/placeholder.svg?height=20&width=30"
                                                alt="Language"
                                                className="h-5 w-7"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>English</DropdownMenuItem>
                                        <DropdownMenuItem>Spanish</DropdownMenuItem>
                                        <DropdownMenuItem>French</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="ghost" size="icon">
                                    <Maximize2 className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Bell className="h-5 w-5" />
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center space-x-2">
                                            <img
                                                src="/placeholder.svg?height=32&width=32"
                                                alt="User"
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <div className="text-left">
                                                <div className="text-sm font-medium">John Smilga</div>
                                                <div className="text-xs text-gray-500">Super Admin</div>
                                            </div>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>My Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <LogoutButton />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
