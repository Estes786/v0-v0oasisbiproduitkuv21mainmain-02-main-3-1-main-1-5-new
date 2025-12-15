'use client';

import Script from 'next/script';

// Google Tag Manager Container ID
// Configure your GTM container at: https://tagmanager.google.com
// You need to create a GTM container and get your GTM-XXXXXX ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export function GoogleTagManager() {
  // If GTM ID is not configured, don't render anything
  if (!GTM_ID) {
    console.warn('Google Tag Manager ID not configured. Set NEXT_PUBLIC_GTM_ID in your environment variables.');
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  );
}

// GTM noscript fallback component (place in <body>)
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
