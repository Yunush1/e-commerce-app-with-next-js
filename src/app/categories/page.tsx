'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Lipsticks',
    imageUrl: 'https://picsum.photos/id/31/200/300',
  },
  {
    id: 2,
    name: 'Face Masks',
    imageUrl: 'https://picsum.photos/id/32/200/300',
  },
  {
    id: 3,
    name: 'Eyeliners',
    imageUrl: 'https://picsum.photos/id/33/200/300',
  },
  {
    id: 4,
    name: 'Nail Polishes',
    imageUrl: 'https://picsum.photos/id/34/200/300',
  },
];

const Categories = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link href={`/category/${category.name}`} key={category.id}>
            <div className="rounded-md shadow-md overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
