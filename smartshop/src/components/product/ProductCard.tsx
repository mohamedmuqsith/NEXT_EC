'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice, calculateDiscount } from '@/lib/utils';
import RatingStars from '@/components/ui/RatingStars';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
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
        <div
            className={cn(
                'group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden',
                'shadow-md hover:shadow-2xl transition-all duration-500',
                'border border-gray-100 dark:border-gray-700',
                'transform hover:-translate-y-2 cursor-pointer',
                className
            )}
            onClick={handleCardClick}
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full">
                        <Sparkles className="w-3 h-3" /> NEW
                    </span>
                )}
                {discount > 0 && (
                    <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        -{discount}%
                    </span>
                )}
            </div>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick action buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button
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
                    </button>
                    <button
                        onClick={handleViewDetails}
                        className="flex items-center justify-center p-2.5 bg-white/90 rounded-xl hover:bg-white transition-colors"
                    >
                        <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {product.brand}
                </span>

                {/* Name */}
                <h3 className="mt-1 font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
        </div>
    );
}
