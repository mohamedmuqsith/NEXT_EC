'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
    item: CartItemType;
    className?: string;
}

export default function CartItem({ item, className }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();
    const { product, quantity } = item;

    const handleIncrement = () => {
        if (quantity < product.stock) {
            updateQuantity(product.id, quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1);
        }
    };

    const handleRemove = () => {
        removeFromCart(product.id);
    };

    return (
        <div
            className={cn(
                'flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl',
                'border border-gray-100 dark:border-gray-700',
                'transition-all duration-300 hover:shadow-lg',
                className
            )}
        >
            {/* Product Image */}
            <Link
                href={`/products/${product.id}`}
                className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 flex-shrink-0"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    sizes="128px"
                />
            </Link>

            {/* Product Info */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    {/* Brand */}
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {product.brand}
                    </span>

                    {/* Name */}
                    <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Price */}
                    <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            className={cn(
                                'p-2 rounded-lg transition-colors',
                                quantity <= 1
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300'
                            )}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                            {quantity}
                        </span>
                        <button
                            onClick={handleIncrement}
                            disabled={quantity >= product.stock}
                            className={cn(
                                'p-2 rounded-lg transition-colors',
                                quantity >= product.stock
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300'
                            )}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Line Total & Remove */}
                    <div className="flex items-center gap-4">
                        <p className="font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.price * quantity)}
                        </p>
                        <button
                            onClick={handleRemove}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
