'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
}: ModalProps) {
    // Handle escape key
    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    'relative w-full mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl',
                    'animate-in zoom-in-95 fade-in-0 duration-200',
                    sizes[size]
                )}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        {title && (
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-auto"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
