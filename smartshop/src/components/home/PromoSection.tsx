'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Percent, Gift, Timer } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function PromoSection() {
    const promos = [
        {
            icon: Percent,
            title: 'Flash Sale',
            description: 'Up to 50% off on selected items',
            bgGradient: 'from-orange-500 to-red-600',
            link: '/products?sale=true',
        },
        {
            icon: Gift,
            title: 'New Arrivals',
            description: 'Check out the latest tech',
            bgGradient: 'from-blue-500 to-purple-600',
            link: '/products?new=true',
        },
        {
            icon: Timer,
            title: 'Limited Time',
            description: 'Exclusive deals end soon',
            bgGradient: 'from-green-500 to-teal-600',
            link: '/products',
        },
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {promos.map((promo, index) => (
                        <Link
                            key={index}
                            href={promo.link}
                            className={cn(
                                'group relative overflow-hidden rounded-2xl p-6 lg:p-8',
                                'bg-gradient-to-br',
                                promo.bgGradient,
                                'transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300'
                            )}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:200px_200px]" />
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                                    <promo.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {promo.title}
                                </h3>
                                <p className="text-white/80 mb-4">{promo.description}</p>
                                <div className="flex items-center text-white font-medium">
                                    <span>Shop Now</span>
                                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            {/* Decorative Shapes */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
                        </Link>
                    ))}
                </div>

                {/* Featured Banner */}
                <div className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 lg:p-12">
                    {/* Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
                    </div>

                    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                Subscribe & Save 10%
                            </h2>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Get exclusive deals, early access to new products, and 10% off your first order when you join our newsletter.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <Button>Subscribe</Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 lg:gap-12">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">50K+</p>
                                <p className="text-gray-400 text-sm">Happy Customers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">500+</p>
                                <p className="text-gray-400 text-sm">Products</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-white">24/7</p>
                                <p className="text-gray-400 text-sm">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
