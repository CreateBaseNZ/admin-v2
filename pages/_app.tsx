import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AuthGuard from '../components/AuthGuard';
import NavBar from '../components/UI/NavBar';
import { ProfilesContextProvider } from '../store/profiles-context';
import { TrackingsContextProvider } from '../store/trackings-context';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProfilesContextProvider>
        <TrackingsContextProvider>
          <AuthGuard>
            <NavBar>
              {typeof window === 'undefined' ? null : (
                <Component {...pageProps} />
              )}
            </NavBar>
          </AuthGuard>
        </TrackingsContextProvider>
      </ProfilesContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
