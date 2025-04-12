'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

// Dummy product data
const newArrivals = [
  {
    id: 1,
    name: 'Modern Lamp',
    description: 'A sleek and stylish lamp for your home.',
    imageUrl: 'https://picsum.photos/id/237/200/300',
    price: 49.99,
  },
  {
    id: 2,
    name: 'Cozy Blanket',
    description: 'A warm and comfortable blanket for cold nights.',
    imageUrl: 'https://picsum.photos/id/238/200/300',
    price: 29.99,
  },
  {
    id: 3,
    name: 'Minimalist Watch',
    description: 'A simple and elegant watch for everyday wear.',
    imageUrl: 'https://picsum.photos/id/239/200/300',
    price: 99.99,
  },
  {
    id: 4,
    name: 'Ceramic Vase',
    description: 'A beautifully crafted vase for your favorite flowers.',
    imageUrl: 'https://picsum.photos/id/240/200/300',
    price: 39.99,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mb-4 rounded-md"
                />
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <Button className="mt-4">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
