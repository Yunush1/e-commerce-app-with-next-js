'use server';
 
import { Product } from '@/types/product';
 
const API_BASE_URL = 'https://fakestoreapi.com';
 
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
 
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
 
  const data = await response.json();
  return data;
};
 
export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
 
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
 
  const data = await response.json();
  return data;
};
 
export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products/category/${categoryName}`);
 
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category ${categoryName}`);
  }
 
  const data = await response.json();
  return data;
};
