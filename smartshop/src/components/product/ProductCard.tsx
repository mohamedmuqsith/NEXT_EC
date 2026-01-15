'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice, calculateDiscount } from '@/lib/utils';
import RatingStars from '@/components/ui/RatingStars';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
    product: Product;
    className?: string;
    index?: number;
}

export default function ProductCard({ product, className, index = 0 }: ProductCardProps) {
    const { addToCart, isInCart } = useCart();
    const { showToast } = useToast();
    const router = useRouter();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/products/${product.id}`);
    };

    const handleCardClick = () => {
        router.push(`/products/${product.id}`);
    };

    const discount = product.originalPrice
        ? calculateDiscount(product.originalPrice, product.price)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            className={cn(
                'group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden',
                'shadow-md hover:shadow-2xl transition-shadow duration-500',
                'border border-gray-100 dark:border-gray-700',
                'cursor-pointer',
                className
            )}
            onClick={handleCardClick}
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                        className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full"
                    >
                        <Sparkles className="w-3 h-3" /> NEW
                    </motion.span>
                )}
                {discount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
                        className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full"
                    >
                        -{discount}%
                    </motion.span>
                )}
            </div>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
                <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </motion.div>

                {/* Overlay on hover */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />

                {/* Quick action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className={cn(
                            'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-colors',
                            isInCart(product.id)
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
                        )}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleViewDetails}
                        className="flex items-center justify-center p-2.5 bg-white/90 rounded-xl hover:bg-white transition-colors"
                    >
                        <Eye className="w-5 h-5 text-gray-700" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {product.brand}
                </span>

                {/* Name */}
                <h3 className="mt-1 font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="mt-2">
                    <RatingStars
                        rating={product.rating}
                        size="sm"
                        showValue
                        reviewCount={product.reviewCount}
                    />
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                <div className="mt-2">
                    {product.stock > 10 ? (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            In Stock
                        </span>
                    ) : product.stock > 0 ? (
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                            Only {product.stock} left
                        </span>
                    ) : (
                        <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
