'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Truck, Headphones } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">New Arrivals 2024</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                            Discover the
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                Future of Tech
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                            Explore our curated collection of premium electronics.
                            From the latest smartphones to cutting-edge laptops, we&apos;ve got you covered.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <Link href="/products">
                                <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                    Shop Now
                                </Button>
                            </Link>
                            <Link href="/products?featured=true">
                                <Button variant="outline" size="lg">
                                    View Featured
                                </Button>
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-700/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <Truck className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Free Shipping</p>
                                    <p className="text-xs text-gray-500">On orders $50+</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/20">
                                    <Shield className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">2 Year Warranty</p>
                                    <p className="text-xs text-gray-500">Full coverage</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                                <div className="p-2 rounded-lg bg-cyan-500/20">
                                    <Headphones className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">24/7 Support</p>
                                    <p className="text-xs text-gray-500">Always here to help</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image/Visual */}
                    <div className="relative lg:block hidden">
                        <div className="relative">
                            {/* Main Device Image Container */}
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                {/* Glowing backdrop */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-3xl blur-3xl transform rotate-6" />

                                {/* Device cards floating */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Phone mockup */}
                                    <div className="absolute top-10 left-10 w-48 h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 border border-gray-600">
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-600 rounded-full" />
                                        <div className="m-2 mt-8 h-[calc(100%-3rem)] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                            <Sparkles className="w-12 h-12 text-white/80" />
                                        </div>
                                    </div>

                                    {/* Laptop mockup */}
                                    <div className="absolute bottom-10 right-0 w-72 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500 border border-gray-600">
                                        <div className="m-2 h-[calc(100%-3rem)] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white">SmartShop</span>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-gray-600 rounded-b-xl" />
                                    </div>

                                    {/* Watch mockup */}
                                    <div className="absolute top-1/3 right-10 w-24 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 border border-gray-600">
                                        <div className="m-2 mt-6 h-[calc(100%-2rem)] bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-white/80" />
                                        </div>
                                        {/* Watch band */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-10 h-8 bg-gray-600 rounded-t-lg" />
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 h-8 bg-gray-600 rounded-b-lg" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
                                <p className="text-sm text-gray-500">Products</p>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9</p>
                                <p className="text-sm text-gray-500">Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
