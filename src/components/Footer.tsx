'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
    { name: 'Lipsticks', href: '/category/Lipsticks' },
    { name: 'Face Masks', href: '/category/Face Masks' },
    { name: 'Eyeliners', href: '/category/Eyeliners' },
    { name: 'Nail Polishes', href: '/category/Nail Polishes' },
    { name: 'Blushes', href: '/category/Blushes' },
    { name: 'Foundations', href: '/category/Foundations' },
    { name: 'Concealers', href: '/category/Concealers' },
    { name: 'Bronzers', href: '/category/Bronzers' },
    { name: 'Highlighters', href: '/category/Highlighters' },
    { name: 'Setting Sprays', href: '/category/Setting Sprays' },
];

const Footer = () => {
    return (
        <footer className="bg-[#A04E95] text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved.</p>
                <Link href="/privacy-policy" className="text-white hover:underline">Privacy Policy</Link>
                <div className="mt-4">
                    <h4 className="text-lg font-semibold">Categories</h4>
                    <ul className="flex flex-wrap justify-center">
                        {categories.map((category) => (
                            <li key={category.name} className="mx-2">
                                <Link href={category.href} className="text-white hover:underline">{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
