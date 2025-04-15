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
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
    const router = useRouter();
    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            comment: "",
            rating: 5,
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [open, setOpen] = React.useState(false)


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(parseInt(id));
                setProduct(data);
                setSelectedImage(data?.imageUrl);
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
         const fetchSimilarProducts = async () => {
              if (product) {
                  try {
                      const response = await fetch(`/api/products?category=${product.category}&limit=4`);
                      if (!response.ok) {
                          throw new Error('Failed to fetch similar products');
                      }
                      const data = await response.json();
                      // Filter out the current product
                      const filteredProducts = data.filter((p: Product) => p.name !== product.name);
                      setSimilarProducts(filteredProducts);
                  } catch (err: any) {
                      console.error("Error fetching similar products:", err);
                  }
              }
          };
          fetchSimilarProducts();
      }, [product]);

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

    const additionalImages = [
        "https://picsum.photos/id/237/200/300",
        "https://picsum.photos/id/238/200/300",
        "https://picsum.photos/id/239/200/300",
    ];


    return (
        <div className="container mx-auto py-8">
             <Dialog open={open} onOpenChange={setOpen}>
                 <DialogContent>
                     <DialogHeader>
                         <DialogTitle>{product.name}</DialogTitle>
                         <DialogDescription>
                             <img
                                 src={selectedImage || product.imageUrl}
                                 alt={product.name}
                                 className="rounded-md shadow-md w-full h-96 object-cover"
                             />
                         </DialogDescription>
                     </DialogHeader>
                 </DialogContent>
             </Dialog>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <img
                                src={selectedImage || product.imageUrl}
                                alt={product.name}
                                className="rounded-md shadow-md w-full h-96 object-cover"
                            />
                        </Button>
                    </DialogTrigger>
                    {/* Image Gallery */}
                    <div className="flex mt-4 space-x-2 overflow-x-auto">
                        {[product.imageUrl, ...additionalImages].map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Product Image ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                        <Button>Buy Now</Button>
                        <Button
                            variant="outline"
                            onClick={handleWishlistClick}
                        >
                            {isInWishlist ? <HeartOff /> : <Heart />}
                            {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </Button>
                    </div>

                    <h4 className="text-xl font-semibold mb-4">Customer Reviews</h4>
                    {reviews.map(review => (
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
                    ))}

                    {authUser ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Write a Review</CardTitle>
                                <CardDescription>Share your thoughts about this product</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="comment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your Review</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Write your review here" {...field} />
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
                            </CardContent>
                        </Card>
                    ) : (
                        <p>Please sign in to leave a review.</p>
                    )}
                </div>
            </div>
            <section className="my-8">
                 <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {similarProducts.map((similarProduct) => (
                          <Card key={similarProduct.id}>
                              <CardHeader>
                                  <CardTitle>{similarProduct.name}</CardTitle>
                                  <CardDescription>{similarProduct.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="flex flex-col items-center">
                                  <img
                                       src={similarProduct.imageUrl}
                                       alt={similarProduct.name}
                                       className="mb-4 rounded-md h-32 w-32 object-cover"
                                   />
                                   <p className="text-lg font-semibold">${similarProduct.price.toFixed(2)}</p>
                                   <Button className="mt-4">View Details</Button>
                              </CardContent>
                          </Card>
                      ))}
                  </div>
              </section>
        </div>
    );
};

export default ProductDetails;
