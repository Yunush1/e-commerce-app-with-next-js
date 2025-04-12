'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface Props {
  params: { categoryName: string };
}

// Dummy product data
const products = [
  {
    id: 1,
    name: 'Lipstick - Ruby Red',
    description: 'A classic red lipstick for a bold look.',
    imageUrl: 'https://picsum.photos/id/41/200/300',
    price: 19.99,
    category: 'Lipsticks',
  },
  {
    id: 2,
    name: 'Hydrating Face Mask',
    description: 'A moisturizing mask to rejuvenate your skin.',
    imageUrl: 'https://picsum.photos/id/42/200/300',
    price: 24.99,
    category: 'Face Masks',
  },
  {
    id: 3,
    name: 'Eyeliner - Midnight Black',
    description: 'A long-lasting eyeliner for a dramatic effect.',
    imageUrl: 'https://picsum.photos/id/43/200/300',
    price: 14.99,
    category: 'Eyeliners',
  },
  {
    id: 4,
    name: 'Nail Polish - Rose Gold',
    description: 'A shimmering nail polish for a touch of glamour.',
    imageUrl: 'https://picsum.photos/id/44/200/300',
    price: 9.99,
    category: 'Nail Polishes',
  },
];

const CategoryPage = ({ params }: Props) => {
  const { categoryName } = params;

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
