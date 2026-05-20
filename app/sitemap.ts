import { MetadataRoute } from 'next'
import { cityPages, siteUrl, workPages } from '@/lib/seo-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/#services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#aides`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#photovoltaique`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#zone-intervention`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...cityPages.map((page) => ({
      url: `${siteUrl}/villes/${page.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.72,
    })),
    ...workPages.map((page) => ({
      url: `${siteUrl}/travaux/${page.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.74,
    })),
  ]
}
