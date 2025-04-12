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
