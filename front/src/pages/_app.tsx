import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@/contexts/AuthContex';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Head>
        <title>CGE-RJ</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer theme='dark'/>
    </AuthContextProvider>
  );
}