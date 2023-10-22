import { CategoryInterface } from '@/types/CategoryInterface';
import { ProductInterface } from '@/types/ProductInterface';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

export interface APIResponse<T> {
  message: T;
}

const token = typeof window != 'undefined' ? window.localStorage.getItem('token') : ''

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  }
});

export const useProducts = () => {
  return useSWR<AxiosResponse<ProductInterface[]>>('/products');
}

export const useCategories = () => {
  return useSWR<AxiosResponse<CategoryInterface[]>>('/categories');
}