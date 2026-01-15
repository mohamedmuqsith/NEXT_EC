'use client';

import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface FilterState {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
}

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
    className?: string;
}

const categories = [
    { id: 'mobiles', label: 'Mobiles' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'smart-devices', label: 'Smart Devices' },
];

const priceRanges = [
    { label: 'Under $100', value: [0, 100] as [number, number] },
    { label: '$100 - $500', value: [100, 500] as [number, number] },
    { label: '$500 - $1000', value: [500, 1000] as [number, number] },
    { label: '$1000 - $2000', value: [1000, 2000] as [number, number] },
    { label: 'Over $2000', value: [2000, 10000] as [number, number] },
];

const ratings = [4, 3, 2, 1];

export default function FilterSidebar({
    isOpen,
    onClose,
    filters,
    onFilterChange,
    onClearFilters,
    className,
}: FilterSidebarProps) {
    const handleCategoryChange = (categoryId: string) => {
        const newCategories = filters.categories.includes(categoryId)
            ? filters.categories.filter((c) => c !== categoryId)
            : [...filters.categories, categoryId];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handlePriceChange = (range: [number, number]) => {
        onFilterChange({ ...filters, priceRange: range });
    };

    const handleRatingChange = (rating: number) => {
        onFilterChange({ ...filters, minRating: rating === filters.minRating ? 0 : rating });
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 10000 ||
        filters.minRating > 0;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-64',
                    'bg-white dark:bg-gray-800 shadow-xl lg:shadow-none',
                    'transform lg:transform-none transition-transform duration-300 z-50 lg:z-0',
                    'overflow-y-auto',
                    isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                    className
                )}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Filters
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="w-full mb-6 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    )}

                    {/* Categories */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Categories
                        </h3>
                        <div className="space-y-3">
                            {categories.map((category) => (
                                <label
                                    key={category.id}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.categories.includes(category.id)}
                                        onChange={() => handleCategoryChange(category.id)}
                                        className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {category.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Price Range
                        </h3>
                        <div className="space-y-2">
                            {priceRanges.map((range, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePriceChange(range.value)}
                                    className={cn(
                                        'w-full px-4 py-2 rounded-lg text-left text-sm transition-colors',
                                        filters.priceRange[0] === range.value[0] &&
                                            filters.priceRange[1] === range.value[1]
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    )}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Minimum Rating
                        </h3>
                        <div className="space-y-2">
                            {ratings.map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleRatingChange(rating)}
                                    className={cn(
                                        'w-full px-4 py-2 rounded-lg text-left text-sm transition-colors flex items-center gap-2',
                                        filters.minRating === rating
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <span className="text-yellow-400">{'★'.repeat(rating)}</span>
                                    <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
                                    <span className="ml-1">& Up</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Apply Button (Mobile) */}
                    <div className="lg:hidden">
                        <Button onClick={onClose} className="w-full">
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}
