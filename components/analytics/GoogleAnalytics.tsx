'use client';

import Script from 'next/script';

// Google Analytics 4 Measurement ID
// Stream ID: 13134677006
// Property: OASIS BI PRO (G-YVDTXND4XB)
const GA_MEASUREMENT_ID = 'G-YVDTXND4XB';

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics 4 (GA4) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}
