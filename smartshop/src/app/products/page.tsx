'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar from '@/components/product/FilterSidebar';
import { ProductGridSkeleton } from '@/components/skeleton/ProductSkeleton';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import productsData from '@/data/products.json';
import { Product } from '@/types';

type SortOption = 'price-low' | 'price-high' | 'newest' | 'rating';

interface FilterState {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
}

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState<FilterState>({
        categories: categoryParam ? [categoryParam] : [],
        priceRange: [0, 10000],
        minRating: 0,
    });

    const products = productsData.products as Product[];

    // Simulate loading
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [filters, sortBy, searchParam]);

    // Update filters when URL category changes
    useEffect(() => {
        if (categoryParam) {
            setFilters((prev) => ({
                ...prev,
                categories: [categoryParam],
            }));
        }
    }, [categoryParam]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (searchParam) {
            const query = searchParam.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.brand.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (filters.categories.length > 0) {
            result = result.filter((p) => filters.categories.includes(p.category));
        }

        // Price filter
        result = result.filter(
            (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Rating filter
        if (filters.minRating > 0) {
            result = result.filter((p) => p.rating >= filters.minRating);
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
        }

        return result;
    }, [products, filters, sortBy, searchParam]);

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'newest', label: 'Newest' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
    ];

    const handleClearFilters = () => {
        setFilters({
            categories: [],
            priceRange: [0, 10000],
            minRating: 0,
        });
    };

    return (
        <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {categoryParam
                            ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).replace('-', ' ')
                            : searchParam
                                ? `Search: "${searchParam}"`
                                : 'All Products'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {filteredProducts.length} products found
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={filters}
                        onFilterChange={setFilters}
                        onClearFilters={handleClearFilters}
                        className="hidden lg:block"
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                            {/* Mobile Filter Button */}
                            <Button
                                variant="outline"
                                onClick={() => setIsFilterOpen(true)}
                                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
                                className="lg:hidden"
                            >
                                Filters
                            </Button>

                            {/* View Mode */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        'p-2 rounded-lg transition-colors',
                                        viewMode === 'grid'
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600'
                                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={cn(
                                        'p-2 rounded-lg transition-colors',
                                        viewMode === 'list'
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600'
                                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    )}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <span className="text-sm font-medium">
                                        {sortOptions.find((o) => o.value === sortBy)?.label}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            'w-4 h-4 transition-transform',
                                            isSortOpen && 'rotate-180'
                                        )}
                                    />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 overflow-hidden">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={cn(
                                                    'block w-full px-4 py-2.5 text-left text-sm transition-colors',
                                                    sortBy === option.value
                                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Products */}
                        {isLoading ? (
                            <ProductGridSkeleton count={8} />
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No products found
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <Button onClick={handleClearFilters}>Clear Filters</Button>
                            </div>
                        ) : (
                            <div
                                className={cn(
                                    'grid gap-6',
                                    viewMode === 'grid'
                                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                        : 'grid-cols-1'
                                )}
                            >
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="animate-fade-in"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={handleClearFilters}
                className="lg:hidden"
            />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
            <ProductsContent />
        </Suspense>
    );
}
