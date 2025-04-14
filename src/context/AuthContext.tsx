'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';
import { firebaseApp, auth } from '@/lib/firebase';

interface AuthContextProps {
    authUser: User | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    googleSignIn: () => Promise<void>;
    phoneSignIn: (phoneNumber: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    authUser: null,
    loading: true,
    signUp: async () => {},
    signIn: async () => {},
    signOut: async () => {},
    googleSignIn: async () => {},
    phoneSignIn: async () => {},
});

export function useAuth(): AuthContextProps {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            if (typeof window !== 'undefined') {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        setAuthUser(user);
                    } else {
                        setAuthUser(null);
                    }
                    setLoading(false);
                });

                return () => unsubscribe(); // Cleanup on unmount
            }
            setLoading(false); // Ensure loading is false even if not initialized
        };

        const unsubscribe = initializeAuth();
        return () => unsubscribe && unsubscribe();
    }, []);

    const signUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error("Signup failed:", error.message);
            throw new Error(error.message);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            console.error("Signin failed:", error.message);
            throw new Error(error.message);
        }
    };

    const signOutFunc = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            console.error("Signout failed:", error.message);
            throw new Error(error.message);
        }
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            console.error("Google sign-in failed", error);
            throw new Error(error.message);
        }
    };

   const phoneSignIn = async (phoneNumber: string) => {
        try {
            // Ensure RecaptchaVerifier is properly set up
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response: any) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            }, auth);

            const appVerifier = window.recaptchaVerifier;

            await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // Save the confirmation result to use it later
                    window.confirmationResult = confirmationResult;
                    // Auto-verify the SMS code (for testing purposes only)
                    if (confirmationResult.verificationId) {
                        console.log("SMS sent successfully");
                    }
                }).catch((error) => {
                    console.error("Error sending SMS:", error);
                });
        } catch (error: any) {
            console.error("Phone sign-in error", error);
            throw new Error(error.message);
        }
    };


    const value = {
        authUser,
        loading,
        signUp,
        signIn,
        signOut: signOutFunc,
        googleSignIn,
        phoneSignIn,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

