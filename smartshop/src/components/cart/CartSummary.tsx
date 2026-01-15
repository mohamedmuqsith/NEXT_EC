'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

export default function CartSummary() {
    const { subtotal, tax, total, itemCount } = useCart();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
            </h2>

            {/* Summary Items */}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(subtotal)}
                    </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (10%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(tax)}
                    </span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="block">
                <Button className="w-full" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Proceed to Checkout
                </Button>
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span>Free shipping on orders over $50</span>
                </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Have a promo code?
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <Button variant="outline" size="md">
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    );
}
