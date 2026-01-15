'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    className?: string;
    index?: number;
}

export default function CategoryCard({ category, className, index = 0 }: CategoryCardProps) {
    return (
        <Link href={`/products?category=${category.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                    y: -10,
                    transition: { duration: 0.3 }
                }}
                className={cn(
                    'group relative block overflow-hidden rounded-2xl',
                    'bg-gradient-to-br from-gray-800 to-gray-900',
                    'border border-gray-700 hover:border-blue-500/50',
                    'cursor-pointer',
                    className
                )}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 h-48 flex flex-col justify-end">
                    <motion.h3
                        className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors"
                    >
                        {category.name}
                    </motion.h3>
                    <p className="text-gray-400 text-sm mb-3">
                        {category.productCount} Products
                    </p>
                    <motion.div
                        className="flex items-center text-blue-400 text-sm font-medium"
                        whileHover={{ x: 5 }}
                    >
                        <span>Shop Now</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"
                />
            </motion.div>
        </Link>
    );
}
