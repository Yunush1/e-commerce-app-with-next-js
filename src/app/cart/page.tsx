'use client';

import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/AuthContext"; // Import useAuth hook
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const router = useRouter();
  const { authUser } = useAuth(); // Use the useAuth hook
  const [selectedProducts, setSelectedProducts] = React.useState<number[]>([]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleBuyNow = () => {
        if (!authUser) {
            alert("You need to sign in to proceed to checkout.");
            router.push('/signin'); // Redirect to signin page
            return;
        }

    if (cartItems.length > 0) {
      // Filter cart items based on selected products
      const productsToBuy = cartItems.filter(item => selectedProducts.includes(item.id));

      if (productsToBuy.length === 0) {
        alert("Please select at least one item to buy.");
        return;
      }

      // Serialize and pass the details of selected items
      const productString = JSON.stringify(productsToBuy);
      router.push(`/buy-now?products=${encodeURIComponent(productString)}`);
    } else {
      alert("Your cart is empty. Please add items to your cart before proceeding to buy now.");
    }
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
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
         {!authUser && (
             <div className="mb-4 text-red-600">
                 You are not signed in. Please <Link href="/signin" className="text-blue-500">sign in</Link> or <Link href="/signup" className="text-blue-500">sign up</Link> to proceed to checkout.
             </div>
         )}
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <Checkbox
                id={`product-${item.id}`}
                checked={selectedProducts.includes(item.id)}
                onCheckedChange={() => toggleProductSelection(item.id)}
              />
               <label
                   htmlFor={`product-${item.id}`}
                   className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
               >
                   Select
               </label>
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
          <Button onClick={handleBuyNow} disabled={!authUser}>Buy Now</Button>
          <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
