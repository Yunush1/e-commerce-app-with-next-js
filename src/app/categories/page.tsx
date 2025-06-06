'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Lipsticks',
    imageUrl: 'https://m.media-amazon.com/images/I/71w3oGhZMYL._AC_UF400,400_QL80_.jpg',
  },
  {
    id: 2,
    name: 'Face Masks',
    imageUrl: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_SY450_.jpg',
  },
  {
    id: 3,
    name: 'Eyeliners',
    imageUrl: 'https://m.media-amazon.com/images/I/71pWzhdypcL._AC_UL640_QL65_ML3_.jpg',
  },
  {
    id: 4,
    name: 'Nail Polishes',
    imageUrl: 'https://m.media-amazon.com/images/I/61sbMiUnoGL._AC_UL480_QL65_ML3_.jpg',
  },
  {
    id: 5,
    name: 'Blushes',
    imageUrl: 'https://m.media-amazon.com/images/I/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
  },
  {
    id: 6,
    name: 'Foundations',
    imageUrl: 'https://m.media-amazon.com/images/I/51eg5OLwL5L._AC_UL640_QL65_ML3_.jpg',
  },
  {
    id: 7,
    name: 'Concealers',
    imageUrl: 'https://m.media-amazon.com/images/I/61pHnJ96oPL._AC_UL640_QL65_ML3_.jpg',
  },
  {
    id: 8,
    name: 'Bronzers',
    imageUrl: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SX679_.jpg',
  },
  {
    id: 9,
    name: 'Highlighters',
    imageUrl: 'https://m.media-amazon.com/images/I/71HblAHs5xL._AC_UY879_-2.jpg',
  },
  {
    id: 10,
    name: 'Setting Sprays',
    imageUrl: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_UY226_.jpg',
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
