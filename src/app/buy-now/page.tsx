'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import { FormDescription } from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
    address: z.string().min(10, {
        message: "Address must be at least 10 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    zipCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, {
        message: "Please enter a valid zip code.",
    }),
    paymentMethod: z.string().min(1, {
        message: "Please select a payment method.",
    }),
    terms: z.boolean().refine((value) => value === true, {
        message: 'You must accept the terms and conditions.',
    }),
});

const BuyNowPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const productsString = searchParams.get('products');
    const [products, setProducts] = useState<Product[]>([]);
    const { authUser } = useAuth();
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    useEffect(() => {
        if (!authUser) {
            router.push('/signin');
        }
        if (productsString) {
            try {
                const decodedProducts = JSON.parse(decodeURIComponent(productsString));
                setProducts(decodedProducts);
            } catch (error) {
                console.error("Error decoding products:", error);
                alert("Failed to process product information.");
            }
        }
    }, [productsString, router, authUser]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            city: "",
            zipCode: "",
            paymentMethod: "",
            terms: false,
        },
    });

    const calculateTotalPrice = () => {
        return products.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        setFirebaseError(null);
        try {
            // Simulate a submission process
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Submitting order with values:", values);
            //alert("Order submitted successfully! Thank you for your purchase.");
            //router.push('/profile'); // Redirect to profile page after submission
        } catch (error: any) {
            console.error("Firebase buy now error:", error);
            setFirebaseError("An error occurred during the purchase. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!authUser) {
        return (
            <div className="container mx-auto py-8">
                <h2 className="text-2xl font-bold mb-4">You are not signed in</h2>
                <p>Please <Link href="/signin" className="text-blue-500">sign in</Link> or <Link href="/signup" className="text-blue-500">sign up</Link> to complete your purchase.</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="container mx-auto py-8">
                <h2 className="text-2xl font-bold mb-4">No products to buy</h2>
                <p>Please add products to your cart before proceeding to checkout.</p>
                <Button onClick={() => router.push('/')}>Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            {firebaseError && (
                <div className="mb-4 text-red-600">
                    {firebaseError}
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {products.map((product) => (
                <Card key={product.id} className="mb-4">
                    <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>${product.price.toFixed(2)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded mb-4" />
                        <p>{product.description}</p>
                    </CardContent>
                </Card>
            ))}
            <p className="text-lg font-semibold mb-4">Total: ${calculateTotalPrice()}</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your zip code" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="creditCard" id="creditCard" className="peer h-4 w-4 border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                        </FormControl>
                                        <FormLabel htmlFor="creditCard" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Credit Card</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="paypal" id="paypal" className="peer h-4 w-4 border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                        </FormControl>
                                        <FormLabel htmlFor="paypal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">PayPal</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="stripe" id="stripe" className="peer h-4 w-4 border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                        </FormControl>
                                        <FormLabel htmlFor="stripe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Stripe</FormLabel>
                                    </FormItem>
                                     <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="razorpay" id="razorpay" className="peer h-4 w-4 border border-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                        </FormControl>
                                        <FormLabel htmlFor="razorpay" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Razorpay</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Accept terms and conditions
                                    </FormLabel>
                                    <FormDescription>
                                        You agree to our Terms of Service and Privacy Policy.
                                    </FormDescription>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Order"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Payment Confirmation</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to proceed with the payment of ${calculateTotalPrice()} using {form.getValues("paymentMethod")}?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={async () => {
                                    await onSubmit(form.getValues());
                                    if (!firebaseError) {
                                        alert("Order submitted successfully! Thank you for your purchase.");
                                        router.push('/profile');
                                    }
                                }}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </form>
            </Form>
        </div>
    );
 };

export default BuyNowPage;
