import type { AppProps } from 'next/app';

import '../styles/globals.css';
import CustomerContextProvider, { CustomerContext } from '../context/customer';

const TestTaskApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CustomerContextProvider>
      <Component {...pageProps} />
    </CustomerContextProvider>
  );
};

export default TestTaskApp;
