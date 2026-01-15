'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';

// Cart State Type
interface CartState {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    tax: number;
    total: number;
}

// Cart Actions
type CartAction =
    | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
    | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart Context Type
interface CartContextType extends CartState {
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    isInCart: (productId: number) => boolean;
    getItemQuantity: (productId: number) => number;
}

// Tax rate (10%)
const TAX_RATE = 0.1;

// Calculate cart totals
function calculateTotals(items: CartItem[]): { subtotal: number; tax: number; total: number; itemCount: number } {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return { subtotal, tax, total, itemCount };
}

// Initial state
const initialState: CartState = {
    items: [],
    itemCount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
};

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(
                item => item.product.id === action.payload.product.id
            );

            let newItems: CartItem[];

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                );
            } else {
                // Add new item
                newItems = [...state.items, { product: action.payload.product, quantity: action.payload.quantity }];
            }

            const totals = calculateTotals(newItems);
            return { ...state, items: newItems, ...totals };
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
            const totals = calculateTotals(newItems);
            return { ...state, items: newItems, ...totals };
        }

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                // Remove item if quantity is 0 or less
                const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
                const totals = calculateTotals(newItems);
                return { ...state, items: newItems, ...totals };
            }

            const newItems = state.items.map(item =>
                item.product.id === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            const totals = calculateTotals(newItems);
            return { ...state, items: newItems, ...totals };
        }

        case 'CLEAR_CART':
            return initialState;

        case 'LOAD_CART': {
            const totals = calculateTotals(action.payload);
            return { ...state, items: action.payload, ...totals };
        }

        default:
            return state;
    }
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('smartshop-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: parsedCart });
            } catch (error) {
                console.error('Failed to load cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('smartshop-cart', JSON.stringify(state.items));
    }, [state.items]);

    // Context methods
    const addToCart = (product: Product, quantity: number = 1) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    };

    const removeFromCart = (productId: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const isInCart = (productId: number): boolean => {
        return state.items.some(item => item.product.id === productId);
    };

    const getItemQuantity = (productId: number): number => {
        const item = state.items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
                getItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to use cart context
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
