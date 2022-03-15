import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AuthGuard from '../components/AuthGuard';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </SessionProvider>
  );
}

export default MyApp;
