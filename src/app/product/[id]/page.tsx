'use client';

import React, { useState, useEffect, useContext } from 'react';
import { getProductById } from '@/services/product-service';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';
import { WishlistContext } from '@/context/WishlistContext';
import { Heart, HeartOff } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Star } from 'lucide-react';
import {cn} from "@/lib/utils";

interface Props {
    params: { id: string };
}

const reviewFormSchema = z.object({
    comment: z.string().min(10, {
        message: "Review must be at least 10 characters.",
    }),
    rating: z.number().min(1).max(5).default(5),
});

interface Review {
    id: string;
    comment: string;
    userName: string;
    rating: number;
}

const ProductDetails = ({ params }: Props) => {
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const { wishlistItems, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const { authUser } = useAuth();

    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            comment: "",
            rating: 5,
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);


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
        // Fetch initial reviews (replace with actual API call if available)
        const initialReviews = [
            { id: '1', comment: 'This is a great product!', userName: 'John Doe', rating: 5 },
            { id: '2', comment: 'I really enjoyed using this.', userName: 'Jane Smith', rating: 4 },
        ];
        setReviews(initialReviews);
    }, [id]);

    useEffect(() => {
        if (product) {
            setIsInWishlist(wishlistItems.some(item => item.id === product.id));
        }
    }, [product, wishlistItems]);

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert(`${product.name} added to cart!`);
        }
    };

    const handleWishlistClick = () => {
        if (product) {
            if (isInWishlist) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
            setIsInWishlist(!isInWishlist);
        }
    };

    const onSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
        setIsSubmitting(true);
        try {
            // Simulate submitting a review
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Optimistically update the reviews (replace with actual API call later)
            const newReview = {
                id: String(Date.now()), // temporary ID
                comment: values.comment,
                userName: authUser?.displayName || 'Anonymous',
                rating: values.rating,
            };
            setReviews(prev => [...prev, newReview]);

            form.reset();
            alert("Thank you for your review!");

        } catch (error) {
            console.error("Form submission error:", error);
            alert("An error occurred during form submission. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const StarDisplay = ({ rating }: { rating: number }) => {
        return (
            <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            "h-5 w-5",
                            i < rating ? "text-yellow-500" : "text-gray-300"
                        )}
                    />
                ))}
                <span className="ml-2 text-gray-500">{rating}/5</span>
            </div>
        );
    };


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
                    <div className="flex space-x-4">
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                        <Button variant="outline" onClick={handleWishlistClick}>
                            {isInWishlist ? <HeartOff className="mr-2 h-4 w-4" /> : <Heart className="mr-2 h-4 w-4" />}
                            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <Card key={review.id} className="mb-4">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {review.userName}
                                    <StarDisplay rating={review.rating} />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{review.comment}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}

                {/* Review Submission Form */}
                {authUser ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Add a Review</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your review here"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rating</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                defaultValue={5}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Review"}
                            </Button>
                        </form>
                    </Form>
                ) : (
                    <p>Please sign in to add a review.</p>
                )}
            </section>
        </div>
    );
};

export default ProductDetails;
