import { BarChart2, Box, Briefcase, FileText, Layers, LayoutDashboard, Package, PieChart, ShoppingCart, Tag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


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

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md overflow-y-auto">
            <div className="p-4">
                <Link href="/" className="flex items-center space-x-2">
                    <PieChart className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold">Pro Oasis</span>
                </Link>
            </div>
            <nav className="mt-8">
                {sidebarData.map((section, index) => (
                    <div key={index} className="mb-4">
                        {section.title && (
                            <div className="px-4 py-2 text-gray-500 uppercase text-xs font-semibold">
                                {section.title}
                            </div>
                        )}
                        {section.items.map((item, itemIndex) => (
                            <Link
                                key={itemIndex}
                                href={item.href}
                                className="flex items-center justify-between px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:rounded-lg transition-all duration-200"
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
    )
}

export default Sidebar