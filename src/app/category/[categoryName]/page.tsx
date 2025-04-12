'use client';

import React, { useState, useEffect } from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import { getProductsByCategory } from '@/services/product-service';
import {Button} from '@/components/ui/button';
import { useRouter } from 'next/navigation';


interface Props {
  params: { categoryName: string };
}

const CategoryPage = ({ params }: Props) => {
  const { categoryName } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?category=${categoryName}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products for category ${categoryName}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    const viewProduct = (id:number) => {
        router.push(`/product/${id}`);
    };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
    </div>
  );
};

export default CategoryPage;
