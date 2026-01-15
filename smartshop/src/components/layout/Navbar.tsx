'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ShoppingCart,
    Search,
    Menu,
    X,
    Zap,
    Sun,
    Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { itemCount } = useCart();
    const router = useRouter();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle dark mode
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        document.documentElement.classList.toggle('dark');
    };

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/products?category=mobiles', label: 'Mobiles' },
        { href: '/products?category=laptops', label: 'Laptops' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            SmartShop
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className={cn(
                                    'w-full px-4 py-2.5 pl-11 rounded-xl border-2',
                                    'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
                                    'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
                                    'text-gray-900 dark:text-white placeholder-gray-500',
                                    'transition-all duration-300'
                                )}
                            />
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </form>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700" />
                            )}
                        </button>

                        {/* Cart Icon */}
                        <Link
                            href="/cart"
                            className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                                    {itemCount > 99 ? '99+' : itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl',
                    'transition-all duration-300 overflow-hidden',
                    isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="px-4 py-6 space-y-4">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className={cn(
                                    'w-full px-4 py-3 pl-11 rounded-xl border-2',
                                    'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
                                    'focus:border-blue-500',
                                    'text-gray-900 dark:text-white placeholder-gray-500'
                                )}
                            />
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </form>

                    {/* Mobile Nav Links */}
                    <div className="space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
