"use client"

import React, { useState } from 'react';
import TopNavigation from './components/TopNavigation';
import CategorySelector from './components/CategorySelector';
import ProductGrid from './components/ProductGrid';
import OrderList from './components/OrderList';
import OrderSummary from './components/OrderSummary';
import PaymentActions from './components/PaymentActions';
import useGetProducts from '../product/hooks/useGetProducts';
import { CartItem, ProductDataProps } from '@/lib/Types';
import OrderListHeader from './components/OrderListHeader';
import NewCustomerModal from '../sales/components/NewCustomerModal';

const POSPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [transactionId] = useState('65565');
    const { products, loading, error } = useGetProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to store selected customer
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');

    // Callback to handle customer selection from OrderListHeader
    const handleCustomerSelect = (customer: string) => {
        setSelectedCustomer(customer);
    };

    const handleMessage = () => {
        setIsModalOpen(true);
    };

    const addToCart = (product: ProductDataProps) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);
            if (existingItem) {
                return currentCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };
    
    const removeFromCart = (productId: string) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };
    
    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            setCart(currentCart =>
                currentCart.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <div className="w-full md:w-[65%] flex flex-col">
                <TopNavigation />

                <ProductGrid products={products} selectedCategory={selectedCategory} addToCart={addToCart} />
            </div>

            <div className="w-full md:w-[35%] p-4 md:p-5 flex flex-col bg-white border-l mt-5 md:mt-0">
                {/* Pass the customer selection handler to OrderListHeader */}
                <OrderListHeader
                    onClosing={handleMessage}
                    customer={selectedCustomer}
                    onCustomerSelect={handleCustomerSelect} // New prop for handling customer selection
                />

                <OrderList cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} transactionId={transactionId} />

                <OrderSummary cart={cart} />

                <PaymentActions cart={cart} customer={selectedCustomer} />
            </div>
            <NewCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default POSPage;
