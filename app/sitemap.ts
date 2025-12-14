import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.oasis-bi-pro.web.id'
  const currentDate = new Date().toISOString()

  // Static routes with priorities
  const routes = [
    { route: '', priority: 1.0, changeFreq: 'daily' },
    { route: '/about', priority: 0.8, changeFreq: 'monthly' },
    { route: '/features', priority: 0.9, changeFreq: 'weekly' },
    { route: '/how-it-works', priority: 0.9, changeFreq: 'monthly' },
    { route: '/pricing', priority: 0.95, changeFreq: 'weekly' },
    { route: '/blog', priority: 0.7, changeFreq: 'daily' },
    { route: '/auth/signin', priority: 0.6, changeFreq: 'monthly' },
    { route: '/auth/signup', priority: 0.8, changeFreq: 'monthly' },
    { route: '/legal/privacy', priority: 0.5, changeFreq: 'monthly' },
    { route: '/legal/terms', priority: 0.5, changeFreq: 'monthly' },
    { route: '/legal/refund', priority: 0.5, changeFreq: 'monthly' },
    { route: '/legal/faq', priority: 0.6, changeFreq: 'weekly' },
    { route: '/legal/contact', priority: 0.7, changeFreq: 'monthly' },
    { route: '/legal/dpa', priority: 0.4, changeFreq: 'yearly' },
    { route: '/legal/cookies', priority: 0.4, changeFreq: 'yearly' },
  ].map(({ route, priority, changeFreq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: changeFreq as 'daily' | 'weekly' | 'monthly' | 'yearly',
    priority,
  }))

  return routes
}
