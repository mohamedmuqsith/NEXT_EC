'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface CategoryCardProps {
    category: Category;
    className?: string;
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
    return (
        <Link
            href={`/products?category=${category.id}`}
            className={cn(
                'group relative block overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-gray-800 to-gray-900',
                'border border-gray-700 hover:border-blue-500/50',
                'transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10',
                className
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-6 h-48 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                    {category.productCount} Products
                </p>
                <div className="flex items-center text-blue-400 text-sm font-medium">
                    <span>Shop Now</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
            </div>
        </Link>
    );
}
