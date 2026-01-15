import React from 'react';
import { cn } from '@/lib/utils';

interface ProductSkeletonProps {
    className?: string;
}

export default function ProductSkeleton({ className }: ProductSkeletonProps) {
    return (
        <div
            className={cn(
                'bg-white dark:bg-gray-800 rounded-2xl overflow-hidden',
                'border border-gray-100 dark:border-gray-700',
                'animate-pulse',
                className
            )}
        >
            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-200 dark:bg-gray-700" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Brand */}
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"
                        />
                    ))}
                    <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded ml-2" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                {/* Stock */}
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        </div>
    );
}

// Grid of product skeletons
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}
