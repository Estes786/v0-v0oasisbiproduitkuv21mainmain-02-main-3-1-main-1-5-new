'use client';

import Script from 'next/script';

// HubSpot Cookie Banner Configuration
// Portal ID: na2 (from your Personal Access Key)
// You can configure cookie banner in HubSpot Settings → Privacy & Consent

export function CookieConsent() {
  return (
    <>
      {/* HubSpot Cookie Consent Banner */}
      <Script
        id="hs-cookie-banner"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _hsp = window._hsp = window._hsp || [];
            _hsp.push(['addPrivacyConsentListener', function(consent) {
              console.log('HubSpot Cookie Consent:', consent);
            }]);
          `,
        }}
      />
      
      {/* Cookie Settings Button */}
      <Script
        id="hs-cookie-settings-button"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              var button = document.createElement('button');
              button.type = 'button';
              button.id = 'hs_show_banner_button';
              button.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background-color: #425b76; border: 1px solid #425b76; border-radius: 5px; padding: 10px 16px; text-decoration: none; color: #fff; font-size: 14px; z-index: 9999; cursor: pointer;';
              button.textContent = 'Cookie Settings';
              button.onclick = function() {
                var _hsp = window._hsp = window._hsp || [];
                _hsp.push(['showBanner']);
              };
              document.body.appendChild(button);
            });
          `,
        }}
      />
    </>
  );
}
