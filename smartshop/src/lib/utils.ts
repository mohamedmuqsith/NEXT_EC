import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format price with currency
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Generate star rating array
export function generateStarRating(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push('full');
        } else if (i === fullStars && hasHalfStar) {
            stars.push('half');
        } else {
            stars.push('empty');
        }
    }

    return stars;
}

// Debounce function for search
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
