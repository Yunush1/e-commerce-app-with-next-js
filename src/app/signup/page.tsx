'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

const SignUpPage = () => {
    const router = useRouter();
    const { signUp, googleSignIn } = useAuth();
    const [signUpError, setSignUpError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

      const handleGoogleSignIn = async () => {
         setIsSubmitting(true);
         setSignUpError(null);
         try {
             await googleSignIn();
             router.push('/profile');
         } catch (error: any) {
             setSignUpError(error.message || 'Google Sign-up failed');
         } finally {
             setIsSubmitting(false);
         }
     };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        setSignUpError(null);
        try {
            await signUp(values.email, values.password);
            router.push('/profile');
        } catch (error: any) {
            setSignUpError(error.message || 'Signup failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            {signUpError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline">{signUpError}</span>
                </div>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </Button>
                </form>
            </Form>
             <div className="mt-4">
                 <Button variant="outline" disabled={isSubmitting} onClick={handleGoogleSignIn}>
                        {isSubmitting ? "Signing Up..." : (
                            <>
                                
                                Sign Up with Google
                            </>
                        )}
                    </Button>
                    <p>
                        Already have an account? <Link href="/signin" className="text-blue-500">Sign In</Link>
                    </p>
                </div>
        </div>
    );
};

export default SignUpPage;

