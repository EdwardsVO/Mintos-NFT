import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NEARApiContextProvider } from '../context/nearContext';
import UserContextProvider from '../context/userContext';
import { ChakraProvider } from '@chakra-ui/react';
import MintContextProvider from '../context/mintContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NEARApiContextProvider>
      <UserContextProvider>
        <ChakraProvider>
          <MintContextProvider>
            <Component {...pageProps} />
          </MintContextProvider>
        </ChakraProvider>
      </UserContextProvider>
    </NEARApiContextProvider>
  );
}
export default MyApp;
