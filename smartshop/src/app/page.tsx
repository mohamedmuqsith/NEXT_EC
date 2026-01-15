'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import CategoryCard from '@/components/home/CategoryCard';
import ProductCard from '@/components/product/ProductCard';
import PromoSection from '@/components/home/PromoSection';
import Button from '@/components/ui/Button';
import productsData from '@/data/products.json';
import { Product, Category } from '@/types';

export default function HomePage() {
  const products = productsData.products as Product[];
  const categories = productsData.categories as Category[];
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of electronics across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Handpicked products just for you
              </p>
            </div>
            <Link href="/products">
              <Button
                variant="outline"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="mt-4 sm:mt-0"
              >
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <PromoSection />

      {/* New Arrivals Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check out the latest additions to our store
              </p>
            </div>
            <Link href="/products?new=true">
              <Button
                variant="ghost"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="mt-4 sm:mt-0"
              >
                See More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.isNew)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">50K+</p>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">500+</p>
              <p className="text-blue-100">Products</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">100+</p>
              <p className="text-blue-100">Brands</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold mb-2">4.9</p>
              <p className="text-blue-100">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
