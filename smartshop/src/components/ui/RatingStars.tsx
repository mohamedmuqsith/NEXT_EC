'use client';

import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { generateStarRating } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
    rating: number;
    maxStars?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    reviewCount?: number;
    className?: string;
}

export default function RatingStars({
    rating,
    maxStars = 5,
    size = 'md',
    showValue = false,
    reviewCount,
    className,
}: RatingStarsProps) {
    const stars = generateStarRating(Math.min(rating, maxStars));

    const sizes = {
        sm: 'w-3.5 h-3.5',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div className="flex items-center">
                {stars.map((star, index) => (
                    <span key={index} className="relative">
                        {star === 'full' && (
                            <Star
                                className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')}
                            />
                        )}
                        {star === 'half' && (
                            <div className="relative">
                                <Star className={cn(sizes[size], 'text-gray-300')} />
                                <div className="absolute inset-0 overflow-hidden w-1/2">
                                    <Star
                                        className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')}
                                    />
                                </div>
                            </div>
                        )}
                        {star === 'empty' && (
                            <Star className={cn(sizes[size], 'text-gray-300')} />
                        )}
                    </span>
                ))}
            </div>
            {showValue && (
                <span className={cn('font-medium text-gray-700 dark:text-gray-300 ml-1', textSizes[size])}>
                    {rating.toFixed(1)}
                </span>
            )}
            {reviewCount !== undefined && (
                <span className={cn('text-gray-500 dark:text-gray-400', textSizes[size])}>
                    ({reviewCount.toLocaleString()})
                </span>
            )}
        </div>
    );
}
