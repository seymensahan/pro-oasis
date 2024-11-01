import { Product } from "@/app/types"

const categories = [
    { id: 'all', name: 'All Categories', items: 80, icon: '/placeholder.svg?height=40&width=40' },
    { id: 'headphones', name: 'Headphones', items: 4, icon: '/placeholder.svg?height=40&width=40' },
    { id: 'shoes', name: 'Shoes', items: 14, icon: '/placeholder.svg?height=40&width=40' },
    { id: 'mobiles', name: 'Mobiles', items: 7, icon: '/placeholder.svg?height=40&width=40' },
    { id: 'watch', name: 'Watch', items: 16, icon: '/placeholder.svg?height=40&width=40' },
]

const products: Product[] = [
    { id: 'PT0001', productName: 'iPhone 14 64GB', category: 'Mobiles', price: 15800, quantity: 30, image: '/placeholder.svg?height=100&width=100' },
    { id: 'PT0002', productName: 'MacBook Pro', category: 'Computer', price: 1000, quantity: 140, image: '/placeholder.svg?height=100&width=100' },
    { id: 'PT0003', productName: 'Rolex Tribute V3', category: 'Watches', price: 6800, quantity: 220, image: '/placeholder.svg?height=100&width=100' },
    { id: 'PT0004', productName: 'Red Nike Angelo', category: 'Shoes', price: 7800, quantity: 78, image: '/placeholder.svg?height=100&width=100' },
    { id: 'PT0005', productName: 'Airpod 2', category: 'Headphones', price: 5478, quantity: 47, image: '/placeholder.svg?height=100&width=100' },
    { id: 'PT0006', productName: 'Blue White OGR', category: 'Shoes', price: 987, quantity: 54, image: '/placeholder.svg?height=100&width=100' },
]

export { categories, products }