'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/types/product';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]); // Default price range
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [budget, setBudget] = useState<number | null>(null);

    useEffect(() => {
        const query = searchParams.get('q') || '';
        const minPriceParam = searchParams.get('minPrice');
        const maxPriceParam = searchParams.get('maxPrice');

        setSearchQuery(query);

        let minPrice = minPriceParam ? parseInt(minPriceParam) : 0;
        let maxPrice = maxPriceParam ? parseInt(maxPriceParam) : 100;

        setPriceRange([minPrice, maxPrice]);
        

        fetchProducts(query, minPrice, maxPrice);
    }, [searchParams]);

    useEffect(() => {
        applyFilters();
    }, [priceRange, originalProducts]);

    const fetchProducts = async (query: string, minPrice: number = 0, maxPrice: number = 100) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setOriginalProducts(data);

            let filteredProducts = data;

            if (query) {
                filteredProducts = filteredProducts.filter((product: Product) =>
                    product.name.toLowerCase().includes(query.toLowerCase()) ||
                    product.description.toLowerCase().includes(query.toLowerCase())
                );
            }

             filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

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

    const applyFilters = () => {
        let filtered = [...originalProducts];

        filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

        setProducts(filtered);
    };

    const viewProduct = (id: number) => {
        router.push(`/product/${id}`);
    };

    const resetFilters = () => {
        setPriceRange([0, 100]);
        setSearchQuery('');
        router.push(`/search`);
        fetchProducts('');
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-center mb-8">
                <div className="relative w-full md:w-96">
                    <Input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-12"
                    />
                    <Button
                        onClick={handleSearch}
                        className="absolute right-1 top-0 rounded-full"
                        size="icon"
                    >
                        <Icons.search className="h-3 w-3" />
                    </Button>
                </div>
            </div>

            {/* Filtering Section */}
            <div className="mb-8 p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">Filter Options</h3>

                {/* Price Range Filter */}
                <div className="mb-4">
                    <Label htmlFor="price-range" className="block text-sm font-medium text-gray-700">
                        Price Range (${priceRange[0]} - ${priceRange[1]})
                    </Label>
                    <Slider
                        id="price-range"
                        defaultValue={priceRange}
                        max={100}
                        step={1}
                        onValueChange={(value) => setPriceRange(value)}
                        aria-label="price range"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>$0</span>
                        <span>$100</span>
                    </div>
                </div>

                {/* Reset Filters Button */}
                <Button variant="secondary" onClick={resetFilters}>
                    Reset Filters
                </Button>
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
                    !loading && !error && searchQuery && <p>No products found matching your search.</p>}
            </div>
        </div>
    );
};

export default Search;
 

