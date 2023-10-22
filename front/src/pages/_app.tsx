import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@/contexts/AuthContex';
import { SWRConfig } from 'swr';
import { api } from '@/services/api';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <SWRConfig value={{ fetcher: api.get }}>
        <Head>
          <title>CGE-RJ</title>
        </Head>
        <Component {...pageProps} />
        <ToastContainer theme="dark" />
      </SWRConfig>
    </AuthContextProvider>
  );
}
