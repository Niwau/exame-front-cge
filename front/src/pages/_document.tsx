import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" href="/logo512.png" />
      </Head>
      <body className='bg-dark-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
