'use client';

import Script from 'next/script';

// HubSpot Tracking Code ID from your uploaded screenshot
const HUBSPOT_PORTAL_ID = 'na2-0e63-91a8-4211-ab7d-e9106c465dd0'; 

export function HubSpotTracking() {
  return (
    <>
      {/* HubSpot Tracking Code */}
      <Script
        id="hs-script-loader"
        strategy="afterInteractive"
        src={`//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      />
      
      {/* HubSpot Cookie Settings Button */}
      <Script
        id="hubspot-cookie-settings"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._hsp = window._hsp || [];
          `,
        }}
      />
    </>
  );
}

// HubSpot Cookie Settings Button Component
export function HubSpotCookieButton() {
  return (
    <button
      type="button"
      id="hs_show_banner_button"
      style={{
        backgroundColor: '#425b76',
        border: '1px solid #425b76',
        borderRadius: '3px',
        padding: '10px 16px',
        textDecoration: 'none',
        color: '#fff',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'normal',
        lineHeight: 'inherit',
        textAlign: 'left',
        textShadow: 'none',
        cursor: 'pointer'
      }}
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any)._hsp) {
          (window as any)._hsp.push(['showBanner']);
        }
      }}
    >
      Cookie Settings
    </button>
  );
}
