import axios from 'axios';

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