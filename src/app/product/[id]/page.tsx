'use client';

import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

// Dummy product data - replace with actual data fetching
const products: Product[] = [
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

interface Props {
  params: { id: string };
}

const ProductDetails = ({ params }: Props) => {
  const { id } = params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-md shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          {/* Add to cart functionality can be added here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
