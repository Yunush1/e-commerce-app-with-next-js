'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { firebaseApp, auth } from '@/lib/firebase';

interface AuthContextProps {
    authUser: User | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    authUser: null,
    loading: true,
    signUp: async () => {},
    signIn: async () => {},
    signOut: async () => {},
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

    const value = {
        authUser,
        loading,
        signUp,
        signIn,
        signOut: signOutFunc,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

