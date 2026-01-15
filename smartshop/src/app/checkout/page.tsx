'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    CreditCard,
    Banknote,
    CheckCircle,
    ShoppingBag,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useCart } from '@/context/CartContext';
import { formatPrice, cn } from '@/lib/utils';
import { PaymentMethod, ShippingAddress } from '@/types';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, tax, total, clearCart, itemCount } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [formData, setFormData] = useState<ShippingAddress>({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });
    const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof ShippingAddress]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<ShippingAddress> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        clearCart();
        router.push('/');
    };

    // Redirect if cart is empty
    if (items.length === 0 && !showSuccessModal) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Your cart is empty
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Add some items to your cart to checkout
                    </p>
                    <Link href="/products">
                        <Button>Browse Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const inputClasses = (fieldName: keyof ShippingAddress) =>
        cn(
            'w-full px-4 py-3 rounded-xl border-2 transition-all',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'placeholder-gray-400',
            errors[fieldName]
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        );

    return (
        <div className="pt-20 lg:pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Cart</span>
                </Link>

                {/* Header */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Shipping Information */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Shipping Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className={inputClasses('fullName')}
                                        />
                                        {errors.fullName && (
                                            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className={inputClasses('email')}
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                            className={inputClasses('phone')}
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="123 Main Street, Apt 4B"
                                            className={inputClasses('address')}
                                        />
                                        {errors.address && (
                                            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="New York"
                                            className={inputClasses('city')}
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                                        )}
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="NY"
                                            className={inputClasses('state')}
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                                        )}
                                    </div>

                                    {/* ZIP Code */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            ZIP Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="10001"
                                            className={inputClasses('zipCode')}
                                        />
                                        {errors.zipCode && (
                                            <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                                        )}
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Country
                                        </label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className={inputClasses('country')}
                                        >
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Australia">Australia</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Payment Method
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Credit Card */}
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={cn(
                                            'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                                            paymentMethod === 'card'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'p-3 rounded-xl',
                                                paymentMethod === 'card'
                                                    ? 'bg-blue-100 dark:bg-blue-800'
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                            )}
                                        >
                                            <CreditCard
                                                className={cn(
                                                    'w-6 h-6',
                                                    paymentMethod === 'card'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-500'
                                                )}
                                            />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                Credit / Debit Card
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Visa, Mastercard, Amex
                                            </p>
                                        </div>
                                    </button>

                                    {/* Cash on Delivery */}
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cod')}
                                        className={cn(
                                            'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                                            paymentMethod === 'cod'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                'p-3 rounded-xl',
                                                paymentMethod === 'cod'
                                                    ? 'bg-blue-100 dark:bg-blue-800'
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                            )}
                                        >
                                            <Banknote
                                                className={cn(
                                                    'w-6 h-6',
                                                    paymentMethod === 'cod'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-500'
                                                )}
                                            />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                Cash on Delivery
                                            </p>
                                            <p className="text-sm text-gray-500">Pay when you receive</p>
                                        </div>
                                    </button>
                                </div>

                                {/* Card Details (shown only for card payment) */}
                                {paymentMethod === 'card' && (
                                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                            💳 Card payment form would appear here in production.
                                            <br />
                                            This is a frontend-only demo.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Order Summary
                                </h2>

                                {/* Items */}
                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="64px"
                                                />
                                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatPrice(item.product.price)} × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-3 py-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal ({itemCount} items)</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax (10%)</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        Total
                                    </span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                {/* Place Order Button */}
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    className="w-full mt-6"
                                    size="lg"
                                >
                                    Place Order
                                </Button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By placing your order, you agree to our Terms of Service and
                                    Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccessModal}
                onClose={handleSuccessClose}
                size="md"
                showCloseButton={false}
            >
                <div className="text-center py-6">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Order Placed Successfully!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Thank you for your order. You will receive a confirmation email shortly.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Order ID: #SM-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </p>
                    <Button onClick={handleSuccessClose} size="lg">
                        Continue Shopping
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
