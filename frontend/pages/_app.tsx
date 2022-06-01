import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NEARApiContextProvider } from '../context/nearContext';
import UserContextProvider from '../context/userContext';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => {
      NProgress.start();
    });
    router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });
    router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }, []);

  return (
    <NEARApiContextProvider>
      <UserContextProvider>
        <ChakraProvider>
          <Head>
            <link rel="/favicon.ico" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserContextProvider>
    </NEARApiContextProvider>
  );
}
export default MyApp;
