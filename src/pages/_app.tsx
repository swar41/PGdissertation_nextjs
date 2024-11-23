// pages/_app.tsx
import '../app/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PostHogProvider } from 'posthog-js/react'; // Import PostHog Provider
import posthog from 'posthog-js'; // Import PostHog
import { GoogleTagManager } from '@next/third-parties/google'; // Assuming you have this package

import type { AppProps } from 'next/app';

const TRACKING_ID = 'G-60ZNPPYEPB'; // Your Google Analytics ID
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_API_KEY; // PostHog Key
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST; // PostHog Host

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== 'undefined' && POSTHOG_KEY) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: true,
      });

      // Track page views
      const handleRouteChange = (url: string) => {
        posthog.capture('pageview', { path: url });
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      // Clean up on component unmount
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
        posthog.reset();
      };
    }
  }, [router.events]);

  return (
    <>
      {/* Google Tag Manager */}
      <GoogleTagManager gtmId={TRACKING_ID} />
      <PostHogProvider client={posthog}>
        <Component {...pageProps} />
      </PostHogProvider>
    </>
  );
}

export default MyApp;
