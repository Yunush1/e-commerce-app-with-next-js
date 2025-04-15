import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import {Toaster} from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import {AuthProvider} from "@/context/AuthContext";
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import Loading from './loading';
import ClientFooter from '@/components/ClientFooter';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ShopWave',
  description: 'Generated by Firebase Studio',
};

function FooterLoader() {
  return (
      <Suspense fallback={<Loading />}>
          <ClientFooter/>
      </Suspense>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
       <AuthProvider>
        <CartProvider>
         <WishlistProvider>
          <Header />
           {children}
           <Toaster />
            <FooterLoader/>
         </WishlistProvider>
         </CartProvider>
       </AuthProvider>
      </body>
    </html>
  );
}


