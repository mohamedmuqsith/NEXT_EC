import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SmartShop - Electronics E-commerce',
  description: 'The best place to buy electronics online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
