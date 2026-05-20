import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Analytics from '@/components/ui/Analytics'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.renoted.fr'),
  title: {
    default: 'Renoted — Rénovation Énergétique Hauts-de-France | Devis & Rendez-vous Gratuit',
    template: '%s | Renoted',
  },
  description:
    'Teddy Lecomte, mandataire local Effy en Hauts-de-France. Isolation, pompe à chaleur, photovoltaïque, rénovation générale, aides 2026 et rendez-vous gratuit sous 24h. 📞 06.24.29.10.96',
  keywords: [
    'rénovation énergétique Hauts-de-France',
    'mandataire Effy Nord',
    'isolation Lille',
    'pompe à chaleur Saint-Quentin',
    'MaPrimeRénov Pas-de-Calais',
    'aide rénovation Nord',
    'photovoltaïque Hauts-de-France',
    'rénovation générale Hauts-de-France',
    'devis rénovation gratuit',
    'Teddy Lecomte Effy',
    'isolation combles Nord',
    'rendez-vous rénovation énergétique',
    'devis travaux RGE Hauts-de-France',
  ],
  authors: [{ name: 'Teddy Lecomte', url: 'https://www.renoted.fr' }],
  creator: 'Renoted',
  publisher: 'Renoted',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.renoted.fr',
    siteName: 'Renoted',
    title: 'Renoted — Rénovation Énergétique Hauts-de-France | Rendez-vous Gratuit',
    description:
      'Teddy Lecomte, mandataire local Effy en Hauts-de-France. Isolation, PAC, photovoltaïque, rénovation générale, aides 2026. Rendez-vous gratuit.',
        images: [
          {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Renoted — Rénovation Énergétique Hauts-de-France',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renoted — Rénovation Énergétique Hauts-de-France',
    description:
      'Mandataire local Effy. Isolation, PAC, photovoltaïque, MaPrimeRénov\', CEE. Rendez-vous gratuit sous 24h.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.renoted.fr',
    languages: {
      'fr-FR': 'https://www.renoted.fr',
    },
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Renoted',
  description: 'Mandataire local Effy — Rénovation énergétique Hauts-de-France',
  url: 'https://www.renoted.fr',
  logo: 'https://www.renoted.fr/logo.svg',
  image: 'https://www.renoted.fr/og-image.svg',
  founder: {
    '@type': 'Person',
    name: 'Teddy Lecomte',
  },
  telephone: '+33624291096',
  email: 'contact@renoted.fr',
  priceRange: 'Étude et devis gratuits',
  areaServed: [
    'Hauts-de-France',
    'Nord',
    'Pas-de-Calais',
    'Somme',
    'Oise',
    'Aisne',
    'Lille',
    'Valenciennes',
    'Douai',
    'Lens',
    'Arras',
    'Calais',
    'Boulogne-sur-Mer',
    'Amiens',
    'Saint-Quentin',
    'Péronne',
    'Bapaume',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '12:00',
    },
  ],
  sameAs: ['https://www.effy.fr/'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de rénovation énergétique',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Isolation thermique' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pompe à chaleur' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photovoltaïque' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chauffe-eau thermodynamique' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Audit énergétique' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rénovation générale intérieur extérieur' } },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* Google Analytics 4 — remplacer G-XXXXXXXXXX par votre ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}
      </head>
      <body className="font-sans">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
