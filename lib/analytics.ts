/**
 * Google Analytics 4 Event Tracking
 * Documentation: https://developers.google.com/analytics/devguides/collection/ga4/events
 */

type EventName =
  | 'sign_up'
  | 'login'
  | 'begin_checkout'
  | 'purchase'
  | 'view_item'
  | 'select_content'
  | 'search'
  | 'page_view';

type EventParams = {
  [key: string]: string | number | boolean;
};

/**
 * Send custom event to Google Analytics 4
 */
export const trackEvent = (eventName: EventName, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  } else {
    console.warn('Google Analytics not loaded yet');
  }
};

/**
 * Track page view (automatic with Next.js router but can be called manually)
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-M3RKJXHLJ7', {
      page_path: url,
    });
  }
};

/**
 * Track user signup
 */
export const trackSignUp = (method: 'email' | 'google') => {
  trackEvent('sign_up', {
    method,
  });
};

/**
 * Track user login
 */
export const trackLogin = (method: 'email' | 'google') => {
  trackEvent('login', {
    method,
  });
};

/**
 * Track subscription plan selection
 */
export const trackPlanSelection = (plan: string, price: number) => {
  trackEvent('view_item', {
    item_name: plan,
    item_category: 'subscription',
    price,
    currency: 'IDR',
  });
};

/**
 * Track checkout start
 */
export const trackCheckoutStart = (plan: string, price: number) => {
  trackEvent('begin_checkout', {
    item_name: plan,
    value: price,
    currency: 'IDR',
  });
};

/**
 * Track successful purchase
 */
export const trackPurchase = (
  orderId: string,
  plan: string,
  price: number,
  transactionId: string
) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: price,
    currency: 'IDR',
    items: [
      {
        item_id: orderId,
        item_name: plan,
        item_category: 'subscription',
        price,
      },
    ],
  });
};

/**
 * Track content interaction
 */
export const trackContentClick = (contentType: string, contentId: string) => {
  trackEvent('select_content', {
    content_type: contentType,
    content_id: contentId,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
  });
};

/**
 * TypeScript global declaration for gtag
 */
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      params?: EventParams
    ) => void;
  }
}
