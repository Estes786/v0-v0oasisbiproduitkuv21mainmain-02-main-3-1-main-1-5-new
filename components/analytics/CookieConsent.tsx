'use client';

import Script from 'next/script';

const COOKIEBOT_ID = '4b5ed9c9-e721-4a39-bedf-b90c61540e19';

export function CookieConsent() {
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={COOKIEBOT_ID}
      type="text/javascript"
      strategy="beforeInteractive"
    />
  );
}
