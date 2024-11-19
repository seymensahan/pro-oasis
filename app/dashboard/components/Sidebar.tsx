import { CirclePercent, Container, FileChartPie, HandPlatter, LayoutDashboard, Package, PackagePlus, PieChart, ReceiptText, ShoppingCartIcon, Store, Tag, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const sidebarData = [
    {
        title: "Main",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: Store, label: "Stores", href: "/dashboard/stores" },
            // { icon: BarChart2, label: "Sales Dashboard", href: "/sales-dashboard" },
        ],
    },
    {
        title: "Inventory",
        items: [
            { icon: Package, label: "Products", href: "/dashboard/product" },
            { icon: Container, label: "Supply", href: "/dashboard/supplies" },
            { icon: PackagePlus, label: "Supplier", href: "/dashboard/suppliers" },
            { icon: HandPlatter, label: "Services", href: "/dashboard/services" },
            { icon: FileChartPie, label: "Appointements", href: "/dashboard/appointement" },
        ],
    },
    {
        title: "Sales",
        items: [
            { icon: ShoppingCartIcon, label: "Sales", href: "/dashboard/sales" },
            { icon: ReceiptText, label: "Invoice", href: "/dashboard/invoice" },
            { icon: CirclePercent, label: "POS", href: "/dashboard/pos" },
        ],
    },
    {
        title: "Store",
        items: [
            { icon: Package, label: "Manage Stock", href: "/dashboard/stock" },
            // { icon: NotepadText, label: "Stock Adjustment", href: "/dashboard/stock-ajustment" },
        ],
    },
    {
        title: "Human ressources",
        items: [
            { icon: User, label: "Employees", href: "/dashboard/employees" },
            // { icon: NotepadText, label: "Stock Adjustment", href: "/dashboard/stock-ajustment" },
        ],
    },
];

const Sidebar = () => {
    return (
        <aside className="w-45 bg-white shadow-md overflow-y-auto">
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