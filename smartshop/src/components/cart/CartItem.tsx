'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
    item: CartItemType;
    className?: string;
    index?: number;
}

export default function CartItem({ item, className, index = 0 }: CartItemProps) {
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
        <motion.div
            layout
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30, scale: 0.9 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={cn(
                'flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl',
                'border border-gray-100 dark:border-gray-700',
                'hover:shadow-lg transition-shadow duration-300',
                className
            )}
        >
            {/* Product Image */}
            <Link
                href={`/products/${product.id}`}
                className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 flex-shrink-0"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                    />
                </motion.div>
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
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
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
                        </motion.button>
                        <motion.span
                            key={quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="w-12 text-center font-semibold text-gray-900 dark:text-white"
                        >
                            {quantity}
                        </motion.span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
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
                        </motion.button>
                    </div>

                    {/* Line Total & Remove */}
                    <div className="flex items-center gap-4">
                        <motion.p
                            key={product.price * quantity}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="font-bold text-gray-900 dark:text-white"
                        >
                            {formatPrice(product.price * quantity)}
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleRemove}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
