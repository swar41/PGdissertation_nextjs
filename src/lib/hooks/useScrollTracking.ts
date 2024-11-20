// lib/hooks/useScrollTracking.ts
import { useEffect } from 'react';
import GoogleAnalytics from 'react-ga4';

export const useScrollTracking = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      GoogleAnalytics.event({
        category: 'Scroll',
        action: 'Scroll Percentage',
        value: Math.round(scrollPercentage),
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
