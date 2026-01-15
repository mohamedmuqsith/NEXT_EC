'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items, clearCart, itemCount } = useCart();

    return (
        <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                    {items.length > 0 && (
                        <Button
                            variant="ghost"
                            onClick={clearCart}
                            leftIcon={<Trash2 className="w-4 h-4" />}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            Clear Cart
                        </Button>
                    )}
                </div>

                {items.length === 0 ? (
                    /* Empty Cart State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm">
                            Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
                        </p>
                        <Link href="/products">
                            <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    /* Cart Content */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <CartItem key={item.product.id} item={item} />
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <CartSummary />
                        </div>
                    </div>
                )}

                {/* Continue Shopping */}
                {items.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
