'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Dummy product data
const newArrivals = [
  {
    id: 1,
    name: 'Lipstick - Ruby Red',
    description: 'A classic red lipstick for a bold look.',
    imageUrl: 'https://picsum.photos/id/41/200/300',
    price: 19.99,
  },
  {
    id: 2,
    name: 'Hydrating Face Mask',
    description: 'A moisturizing mask to rejuvenate your skin.',
    imageUrl: 'https://picsum.photos/id/42/200/300',
    price: 24.99,
   },
  {
    id: 3,
    name: 'Eyeliner - Midnight Black',
    description: 'A long-lasting eyeliner for a dramatic effect.',
    imageUrl: 'https://picsum.photos/id/43/200/300',
    price: 14.99,
  },
  {
    id: 4,
    name: 'Nail Polish - Rose Gold',
    description: 'A shimmering nail polish for a touch of glamour.',
    imageUrl: 'https://picsum.photos/id/44/200/300',
    price: 9.99,
  },
];

export default function Home() {
  const router = useRouter();

  const viewProduct = (id:number) => {
    router.push(`/product/${id}`);
  };
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
                <Button className="mt-4" onClick={() => viewProduct(product.id)}>View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
