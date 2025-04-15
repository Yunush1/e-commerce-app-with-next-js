'use client';

import React, {useState, useEffect} from "react";
import {firebaseApp} from "@/lib/firebase";
import {getAnalytics} from "firebase/analytics";
import Footer from "@/components/Footer";

const ClientFooter = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize Firebase Analytics only on the client-side
        if (typeof window !== 'undefined') {
            getAnalytics(firebaseApp);
        }

        // Simulate loading
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return !loading ? <Footer /> : null;
};

export default ClientFooter;
