'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />,
    };

    const bgColors = {
        success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
        error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
        warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
        info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg',
                            'animate-in slide-in-from-right-5 fade-in-0 duration-300',
                            'min-w-[300px] max-w-[400px]',
                            bgColors[toast.type]
                        )}
                    >
                        {icons[toast.type]}
                        <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            {toast.message}
                        </span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
