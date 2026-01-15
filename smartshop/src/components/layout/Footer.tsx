import React from 'react';
import Link from 'next/link';
import {
    Zap,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        shop: [
            { href: '/products?category=mobiles', label: 'Mobiles' },
            { href: '/products?category=laptops', label: 'Laptops' },
            { href: '/products?category=accessories', label: 'Accessories' },
            { href: '/products?category=smart-devices', label: 'Smart Devices' },
        ],
        support: [
            { href: '#', label: 'Contact Us' },
            { href: '#', label: 'FAQs' },
            { href: '#', label: 'Shipping Info' },
            { href: '#', label: 'Returns' },
        ],
        company: [
            { href: '#', label: 'About Us' },
            { href: '#', label: 'Careers' },
            { href: '#', label: 'Press' },
            { href: '#', label: 'Blog' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Youtube, href: '#', label: 'Youtube' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">SmartShop</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Your one-stop destination for the latest electronics and smart devices.
                            Quality products, competitive prices, and exceptional service.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500" />
                                <span>support@smartshop.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-blue-500" />
                                <span>123 Tech Street, Silicon Valley, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} SmartShop. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6 text-sm">
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
