'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingCart,
    Heart,
    Share2,
    Truck,
    Shield,
    RefreshCw,
    Check,
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';
import RatingStars from '@/components/ui/RatingStars';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast';
import productsData from '@/data/products.json';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { addToCart, isInCart, getItemQuantity } = useCart();
    const { showToast } = useToast();

    const products = productsData.products as Product[];
    const product = products.find((p) => p.id === parseInt(resolvedParams.id));

    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    if (!product) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Product not found
                    </h1>
                    <Link href="/products">
                        <Button>Back to Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice
        ? calculateDiscount(product.originalPrice, product.price)
        : 0;

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        showToast(`${product.name} added to cart!`, 'success');
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        router.push('/checkout');
    };

    const inCart = isInCart(product.id);
    const cartQuantity = getItemQuantity(product.id);

    return (
        <div className="pt-20 lg:pt-24 min-h-screen bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {discount > 0 && (
                                <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                                    -{discount}%
                                </span>
                            )}
                            {product.isNew && (
                                <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                                    NEW
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Brand & Name */}
                        <div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                {product.brand}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-1">
                                {product.name}
                            </h1>
                        </div>

                        {/* Rating */}
                        <RatingStars
                            rating={product.rating}
                            showValue
                            reviewCount={product.reviewCount}
                            size="md"
                        />

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-gray-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                            {discount > 0 && (
                                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
                                    Save {formatPrice(product.originalPrice! - product.price)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Features */}
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Key Features
                            </h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                                    >
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.stock > 10 ? (
                                <>
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                        In Stock ({product.stock} available)
                                    </span>
                                </>
                            ) : product.stock > 0 ? (
                                <>
                                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                                    <span className="text-orange-600 dark:text-orange-400 font-medium">
                                        Low Stock - Only {product.stock} left
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                                    <span className="text-red-600 dark:text-red-400 font-medium">
                                        Out of Stock
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-900 dark:text-white">
                                Quantity:
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="w-12 text-center text-lg font-semibold text-gray-900 dark:text-white">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Cart Info */}
                        {inCart && (
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                                ✓ {cartQuantity} already in your cart
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                leftIcon={<ShoppingCart className="w-5 h-5" />}
                                className="flex-1"
                                size="lg"
                            >
                                Add to Cart
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                disabled={product.stock === 0}
                                variant="secondary"
                                className="flex-1"
                                size="lg"
                            >
                                Buy Now
                            </Button>
                        </div>

                        {/* Wishlist & Share */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => {
                                    setIsWishlisted(!isWishlisted);
                                    showToast(
                                        isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
                                        'success'
                                    );
                                }}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 rounded-xl transition-colors',
                                    isWishlisted
                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                )}
                            >
                                <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
                                <span className="text-sm font-medium">Wishlist</span>
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    showToast('Link copied to clipboard!', 'info');
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                                <span className="text-sm font-medium">Share</span>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">Free Shipping</p>
                            </div>
                            <div className="text-center">
                                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">2 Year Warranty</p>
                            </div>
                            <div className="text-center">
                                <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">30-Day Returns</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
