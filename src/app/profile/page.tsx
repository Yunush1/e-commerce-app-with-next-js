'use client';

import React from 'react';
import { Button } from "@/components/ui/button"

const ProfilePage = () => {
  // Placeholder data for orders
  const orders = [
    { id: 1, date: '2024-07-15', items: 2, total: 65.98, paymentStatus: 'Paid', shippingStatus: 'Shipped' },
    { id: 2, date: '2024-07-01', items: 1, total: 25.50, paymentStatus: 'Paid', shippingStatus: 'Delivered' },
    // Add more order data as needed
  ];

  // Placeholder data for user information
  const user = {
    name: 'Test User',
    email: 'test@example.com',
    address: '123 Main St, Anytown',
  };

    const handleReturn = (orderId: number) => {
        alert(`Return initiated for order ${orderId}.  This is a placeholder function.`);
        // Implement actual return logic here
    };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {/* User Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">User Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

        {/* Return Policy */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
            <p>
                Our return policy allows you to return items within 30 days of purchase.
                Please ensure the items are unused and in their original packaging.
                Contact customer support for assistance with returns.
            </p>
        </div>

      {/* Order History */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Order History</h3>
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b">Order ID</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Items</th>
                  <th className="py-2 px-4 border-b">Total</th>
                  <th className="py-2 px-4 border-b">Payment Status</th>
                  <th className="py-2 px-4 border-b">Shipping Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.date}</td>
                    <td className="py-2 px-4 border-b">{order.items}</td>
                    <td className="py-2 px-4 border-b">${order.total.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{order.paymentStatus}</td>
                    <td className="py-2 px-4 border-b">{order.shippingStatus}</td>
                      <td className="py-2 px-4 border-b">
                          <Button onClick={() => handleReturn(order.id)}>Return</Button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
     </div>
   );
};

export default ProfilePage;
