// src/pages/POSPage.tsx

'use client'

import React, { useState } from 'react'
import { CartItem, Product } from '@/app/types'
import { products } from './data'
import TopNavigation from './components/TopNavigation'
import CategorySelector from './components/CategorySelector'
import ProductGrid from './components/ProductGrid'
import OrderList from './components/OrderList'
import OrderSummary from './components/OrderSummary'
import PaymentActions from './components/PaymentActions'

const POSPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [cart, setCart] = useState<CartItem[]>([])
    const [transactionId] = useState('65565')

    const addToCart = (product: Product) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id)
            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...currentCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: string) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCart(productId)
        } else {
            setCart(currentCart =>
                currentCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            )
        }
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Side: Main Content */}
            <div className="w-full md:w-[65%] flex flex-col">
                {/* Top Navigation */}
                <TopNavigation />

                {/* Category Selector */}
                <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

                {/* Products Grid */}
                <ProductGrid products={products} selectedCategory={selectedCategory} addToCart={addToCart} />
            </div>

            {/* Right Side: Sidebar for Cart and Payment */}
            <div className="w-full md:w-[35%] p-4 md:p-5 flex flex-col bg-white border-l mt-5 md:mt-0">
                {/* Order List */}
                <OrderList cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} transactionId={transactionId} />

                {/* Order Summary */}
                <OrderSummary cart={cart} />

                {/* Payment Actions */}
                <PaymentActions />
            </div>
        </div>
    )
}

export default POSPage
