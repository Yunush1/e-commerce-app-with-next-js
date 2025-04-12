'use client';

import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const router = useRouter();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleBuyNow = () => {
    // Navigate to the buy now page
    router.push('/buy-now');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Total: ${calculateTotalPrice()}</p>
        <div>
          <Button onClick={handleBuyNow}>Buy Now</Button>
          <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
