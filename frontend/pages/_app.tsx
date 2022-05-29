import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NEARApiContextProvider } from '../context/nearContext';
import UserContextProvider from '../context/userContext';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NEARApiContextProvider>
      <UserContextProvider>
        <ChakraProvider>
        <Component {...pageProps} />
        </ChakraProvider>
      </UserContextProvider>
    </NEARApiContextProvider>
  );
}
export default MyApp;
