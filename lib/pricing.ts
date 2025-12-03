// Pricing Configuration
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    slug: 'starter',
    price: 99000,
    originalPrice: 199000,
    displayPrice: '99.000',
    displayOriginalPrice: '199.000',
    currency: 'IDR',
    period: 'bulan',
    description: 'Perfect untuk startup dan SMEs',
    features: [
      '3 anggota team',
      '50,000 events/bulan',
      '5 integrasi data sources',
      'Real-time analytics dashboard',
      'Email support (48h response)',
      '30-day data retention',
      'Basic reporting',
    ],
  },
  professional: {
    name: 'Professional',
    slug: 'professional',
    price: 299000,
    displayPrice: '299.000',
    currency: 'IDR',
    period: 'bulan',
    description: 'Paling populer untuk growing businesses',
    popular: true,
    features: [
      '10 anggota team',
      '250,000 events/bulan',
      'Unlimited integrasi',
      'Advanced analytics dashboard',
      'Priority support (24h response)',
      '90-day data retention',
      'AI-powered insights & forecasting',
      'Anomaly detection otomatis',
      'Multi-touch attribution (5 models)',
      'Automated custom reports',
      'Team collaboration features',
      'API access (rate-limited)',
    ],
  },
  business: {
    name: 'Business',
    slug: 'business',
    price: 499000,
    displayPrice: '499.000',
    currency: 'IDR',
    period: 'bulan',
    description: 'For large teams & enterprises',
    features: [
      'Unlimited team members',
      'Unlimited events',
      'Unlimited integrations',
      'Full analytics suite',
      'Dedicated account manager',
      'Unlimited data retention',
      'Advanced AI/ML models',
      'Custom dashboards',
      'Custom integrations',
      'Full API access (unlimited)',
      'SLA guarantee 99.9%',
      'SOC2 compliance support',
      'On-premise deployment option',
      'Custom training & onboarding',
    ],
  },
} as const;

export type PlanSlug = keyof typeof PRICING_PLANS;

export const getPlanBySlug = (slug: string) => {
  return PRICING_PLANS[slug as PlanSlug] || null;
};

export const getPlanPrice = (slug: string): number => {
  const plan = getPlanBySlug(slug);
  return plan ? plan.price : 0;
};
