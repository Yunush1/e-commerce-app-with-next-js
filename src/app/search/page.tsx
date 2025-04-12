'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
      const query = searchParams.get('q') || '';
      setSearchQuery(query);
      if (query) {
          fetchProducts(query);
      }
  }, [searchParams]);

  const fetchProducts = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      // Filter products based on the search query
      const filteredProducts = data.filter((product: Product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    router.push(`/search?q=${searchQuery}`);
  };

  const viewProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center mb-8">
        <Input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-96"
        />
        <Button onClick={handleSearch} className="ml-2">Search</Button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mb-4 rounded-md w-32 h-32 object-cover"
                />
                <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                <Button className="mt-4" onClick={() => viewProduct(product.id)}>View Details</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          !loading && !error && searchQuery && <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
