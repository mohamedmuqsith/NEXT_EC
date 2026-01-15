'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      inline-flex items-center justify-center gap-2 font-semibold
      rounded-xl transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      transform active:scale-95
    `;

        const variants = {
            primary: `
        bg-gradient-to-r from-blue-600 to-blue-700
        hover:from-blue-700 hover:to-blue-800
        text-white shadow-lg shadow-blue-500/25
        focus:ring-blue-500
      `,
            secondary: `
        bg-gradient-to-r from-purple-600 to-purple-700
        hover:from-purple-700 hover:to-purple-800
        text-white shadow-lg shadow-purple-500/25
        focus:ring-purple-500
      `,
            outline: `
        border-2 border-blue-600 text-blue-600
        hover:bg-blue-600 hover:text-white
        focus:ring-blue-500
      `,
            ghost: `
        text-gray-700 hover:bg-gray-100
        dark:text-gray-200 dark:hover:bg-gray-800
        focus:ring-gray-500
      `,
            danger: `
        bg-gradient-to-r from-red-600 to-red-700
        hover:from-red-700 hover:to-red-800
        text-white shadow-lg shadow-red-500/25
        focus:ring-red-500
      `,
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
