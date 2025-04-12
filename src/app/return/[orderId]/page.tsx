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
import { Textarea } from "@/components/ui/textarea";

interface Props {
    params: { orderId: string };
}

const formSchema = z.object({
    reason: z.string().min(10, {
        message: "Reason must be at least 10 characters.",
    }),
    image: z.string().url({
        message: "Please enter a valid image URL.",
    }),
});

const ReturnPage = ({ params }: Props) => {
    const { orderId } = params;
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
            image: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            console.log("Submitting return request with values:", values);
            // Simulate an actual submission process
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert(`Return request submitted for order ${orderId}! We will review it soon.`);
            router.push('/profile'); // Redirect to profile page after submission
        } catch (error) {
            console.error("Form submission error:", error);
            alert("An error occurred during form submission. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Return Request for Order {orderId}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reason for Return</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Please describe why you are returning this item." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL of the Item</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the URL of the item's image" type="url" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Return Request"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ReturnPage;
