"use client"


import React, { useState } from 'react';
import useGetProducts from '../product/hooks/useGetProducts';
import ProductGrid from './components/ProductGrid';
import OrderList from './components/OrderList';
import OrderSummary from './components/OrderSummary';
import PaymentActions from './components/PaymentActions';
import OrderListHeader from './components/OrderListHeader';
import NewCustomerModal from '../sales/components/NewCustomerModal';
import { CartItem, ProductDataProps } from '@/lib/Types';

const POSPage = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [transactionId] = useState('65565');
    const { products, loading, error } = useGetProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');

    const handleCustomerSelect = (customer: string) => {
        setSelectedCustomer(customer);
    };

    const handleMessage = () => {
        setIsModalOpen(true);
    };

    const addToCart = (product: ProductDataProps) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find((item) => item.id === product.id);
            if (existingItem) {
                return currentCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            setCart((currentCart) =>
                currentCart.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <div className="w-full md:w-[70%] flex flex-col">
                <ProductGrid products={products} addToCart={addToCart} />
            </div>

            <div className="w-full md:w-[34%] p-4 md:p-1 flex flex-col bg-white border-l mt-5 md:mt-0">
                <OrderListHeader
                    onClosing={handleMessage}
                    customer={selectedCustomer}
                    onCustomerSelect={handleCustomerSelect}
                />

                <OrderList
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    transactionId={transactionId}
                />
                <div className="mt-20">
                    <OrderSummary cart={cart} />
                </div>
                <PaymentActions
                    cart={cart}
                    customer={selectedCustomer}
                    onSaleComplete={() => setCart([])} // Reset the cart after sale completion
                />
            </div>
            <NewCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default POSPage;
