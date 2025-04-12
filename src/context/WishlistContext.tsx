'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product } from '@/types/product';

interface WishlistContextProps {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
}

export const WishlistContext = createContext<WishlistContextProps>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    // Load wishlist items from local storage on component mount
    try {
      const storedWishlistItems = localStorage.getItem('wishlistItems');
      if (storedWishlistItems) {
        setWishlistItems(JSON.parse(storedWishlistItems));
      }
    } catch (error) {
      console.error("Failed to load wishlist items from local storage", error);
    }
  }, []);

  useEffect(() => {
    // Save wishlist items to local storage whenever wishlistItems changes
    try {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save wishlist items to local storage", error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        return prevItems;
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const contextValue: WishlistContextProps = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use WishlistContext
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
