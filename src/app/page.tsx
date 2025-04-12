'use client';

import React, { useState, useEffect } from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Link from 'next/link';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {cn} from "@/lib/utils";

const API_BASE_URL = '/api/products';

const categories = [
    {
        id: 1,
        name: 'Lipsticks',
        imageUrl: 'https://m.media-amazon.com/images/I/71w3oGhZMYL._AC_UF400,400_QL80_.jpg',
    },
    {
        id: 2,
        name: 'Face Masks',
        imageUrl: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_SY450_.jpg',
    },
    {
        id: 3,
        name: 'Eyeliners',
        imageUrl: 'https://m.media-amazon.com/images/I/71pWzhdypcL._AC_UL640_QL65_ML3_.jpg',
    },
    {
        id: 4,
        name: 'Nail Polishes',
        imageUrl: 'https://m.media-amazon.com/images/I/61sbMiUnoGL._AC_UL480_QL65_ML3_.jpg',
    },
    {
        id: 5,
        name: 'Blushes',
        imageUrl: 'https://m.media-amazon.com/images/I/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    },
    {
        id: 6,
        name: 'Foundations',
        imageUrl: 'https://m.media-amazon.com/images/I/51eg5OLwL5L._AC_UL640_QL65_ML3_.jpg',
    },
    {
        id: 7,
        name: 'Concealers',
        imageUrl: 'https://m.media-amazon.com/images/I/61pHnJ96oPL._AC_UL640_QL65_ML3_.jpg',
    },
    {
        id: 8,
        name: 'Bronzers',
        imageUrl: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg',
    },
    {
        id: 9,
        name: 'Highlighters',
        imageUrl: 'https://m.media-amazon.com/images/I/71HblAHs5xL._AC_UY879_-2.jpg',
    },
    {
        id: 10,
        name: 'Setting Sprays',
        imageUrl: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_UY226_.jpg',
    },
];

export default function Home() {
    const router = useRouter();
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}?limit=10`);
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
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            {/* Hero Section with Carousel */}
            <section className="mb-8">
                <Carousel
                    className="w-full max-w-5xl mx-auto"
                    opts={{
                        align: 'start',
                    }}
                >
                    <CarouselContent className="w-full pb-4">
                        {[
                            "https://picsum.photos/id/237/800/400",
                            "https://picsum.photos/id/238/800/400",
                            "https://picsum.photos/id/239/800/400",
                        ].map((image, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <img
                                        src={image}
                                        alt={`Carousel Image ${index + 1}`}
                                        className="aspect-square object-cover rounded-md"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                </Carousel>
            </section>

            {/* Categories Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {categories.map(category => (
                        <Link href={`/category/${category.name}`} key={category.id}>
                            <div className="relative rounded-md shadow-md overflow-hidden">
                                <img
                                    src={category.imageUrl}
                                    alt={category.name}
                                    className="w-full h-38 object-cover rounded-t-md"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-75 p-2 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

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
