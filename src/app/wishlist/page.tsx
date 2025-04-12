'use client';

import React, { useContext } from 'react';
import { WishlistContext } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const router = useRouter();

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  const handleViewProduct = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <p>Looks like you haven't added anything to your wishlist yet.</p>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
           <Card key={item.id}>
           <CardHeader>
               <CardTitle>{item.name}</CardTitle>
               <CardDescription>{item.description}</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col items-center">
               <img
                   src={item.imageUrl}
                   alt={item.name}
                   className="mb-4 rounded-md"
               />
               <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
               <div className="flex space-x-2">
                   <Button onClick={() => handleViewProduct(item.id)}>View Details</Button>
                   <Button variant="destructive" onClick={() => handleRemoveFromWishlist(item.id)}>
                       Remove
                   </Button>
               </div>
           </CardContent>
       </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
