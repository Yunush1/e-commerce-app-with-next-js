'use client';

import React, { useState, useEffect } from 'react';
import { getProductById } from '@/services/product-service';
import { Product } from '@/types/product';

interface Props {
  params: { id: string };
}

const ProductDetails = ({ params }: Props) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(parseInt(id));
        setProduct(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

