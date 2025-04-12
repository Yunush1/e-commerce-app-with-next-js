'use client';

import React, { useState, useEffect } from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { getProducts } from '@/services/product-service';
import { cn } from "@/lib/utils";

const API_BASE_URL = '/api/products';

export default function Home() {
  const router = useRouter();
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}?limit=4`);
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
        setNewArrivals(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const viewProduct = (id:number) => {
    router.push(`/product/${id}`);
  };

  if (loading) {
    return <div>Loading new arrivals...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

