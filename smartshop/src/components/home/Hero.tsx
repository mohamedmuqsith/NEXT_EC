'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Truck, Headphones } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs with animation */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-4 h-4 text-blue-400" />
                            </motion.div>
                            <span className="text-sm font-medium text-blue-300">New Arrivals 2024</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
                        >
                            Discover the
                            <motion.span
                                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                style={{ backgroundSize: "200% 200%" }}
                            >
                                Future of Tech
                            </motion.span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            Explore our curated collection of premium electronics.
                            From the latest smartphones to cutting-edge laptops, we&apos;ve got you covered.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                        >
                            <Link href="/products">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                        Shop Now
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/products?featured=true">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button variant="outline" size="lg">
                                        View Featured
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-700/50"
                        >
                            {[
                                { icon: Truck, title: "Free Shipping", subtitle: "On orders $50+", color: "blue" },
                                { icon: Shield, title: "2 Year Warranty", subtitle: "Full coverage", color: "purple" },
                                { icon: Headphones, title: "24/7 Support", subtitle: "Always here to help", color: "cyan" }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className={`p-2 rounded-lg bg-${feature.color}-500/20`}>
                                        <feature.icon className={`w-5 h-5 text-${feature.color}-400`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{feature.title}</p>
                                        <p className="text-xs text-gray-500">{feature.subtitle}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Hero Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative lg:block hidden"
                    >
                        <div className="relative">
                            {/* Main Device Image Container */}
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                {/* Glowing backdrop */}
                                <motion.div
                                    animate={{
                                        rotate: [6, 8, 6],
                                        scale: [1, 1.02, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-3xl blur-3xl"
                                />

                                {/* Device cards floating */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Phone mockup */}
                                    <motion.div
                                        variants={floatingVariants}
                                        animate="animate"
                                        whileHover={{ rotate: 0, scale: 1.05 }}
                                        className="absolute top-10 left-10 w-48 h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl shadow-2xl transform -rotate-12 border border-gray-600"
                                    >
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-2 bg-gray-600 rounded-full" />
                                        <div className="m-2 mt-8 h-[calc(100%-3rem)] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Sparkles className="w-12 h-12 text-white/80" />
                                            </motion.div>
                                        </div>
                                    </motion.div>

                                    {/* Laptop mockup */}
                                    <motion.div
                                        animate={{ y: [10, -10, 10] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        whileHover={{ rotate: 6, scale: 1.05 }}
                                        className="absolute bottom-10 right-0 w-72 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-2xl transform rotate-12 border border-gray-600"
                                    >
                                        <div className="m-2 h-[calc(100%-3rem)] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white">SmartShop</span>
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-gray-600 rounded-b-xl" />
                                    </motion.div>

                                    {/* Watch mockup */}
                                    <motion.div
                                        animate={{ y: [-5, 15, -5] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                        whileHover={{ rotate: 0, scale: 1.1 }}
                                        className="absolute top-1/3 right-10 w-24 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl shadow-2xl transform rotate-6 border border-gray-600"
                                    >
                                        <div className="m-2 mt-6 h-[calc(100%-2rem)] bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-white/80" />
                                        </div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-10 h-8 bg-gray-600 rounded-t-lg" />
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 h-8 bg-gray-600 rounded-b-lg" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                            >
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
                                <p className="text-sm text-gray-500">Products</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl"
                            >
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9</p>
                                <p className="text-sm text-gray-500">Rating</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
