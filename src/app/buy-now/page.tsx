'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { Product } from '@/types/product';

interface BuyNowPageProps {
  searchParams: {
    product?: string; // Serialized JSON of the product
  };
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, {
    message: "Please enter a valid postal code.",
  }),
});

const BuyNowPage = ({ searchParams }: BuyNowPageProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Attempt to parse the product from the URL
  let product: Product | null = null;
  if (searchParams.product) {
    try {
      product = JSON.parse(searchParams.product);
    } catch (error) {
      console.error("Error parsing product from URL:", error);
      // Handle the error appropriately, maybe redirect the user or show an error message
    }
  }
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form with values:", values);
      // Simulate an actual submission process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Thank you for your order! We will ship it to you soon.");
      router.push('/'); // Redirect to home page after submission
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred during form submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        {product ? (
            <div className="mb-6 p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                <img src={product.imageUrl} alt={product.name} className="mt-2 w-32 h-32 object-cover rounded-md" />
            </div>
        ) : (
            <p>No product details available.</p>
        )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Buy Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BuyNowPage;
