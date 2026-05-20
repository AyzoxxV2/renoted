'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

type Service = {
  icon: ReactNode
  title: string
  slug: string
  description: string
  savings: string
  keywords: string
  image?: string
  imageAlt?: string
}

const services: Service[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
        <path d="M12 2v4M8 4h8"/>
      </svg>
    ),
    title: 'Isolation des combles',
    slug: 'isolation-combles',
    description: 'Jusqu\'à 30% d\'économies sur votre facture. L\'isolation des combles est le geste le plus efficace pour une maison plus confortable.',
    savings: 'Jusqu\'à 30% d\'économies',
    keywords: 'isolation combles Nord Hauts-de-France',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
      </svg>
    ),
    title: 'Isolation des murs',
    slug: 'isolation-murs',
    description: 'ITE ou ITI, réduisez les déperditions thermiques de vos murs et améliorez le confort de votre logement toute l\'année.',
    savings: 'Jusqu\'à 25% d\'économies',
    keywords: 'isolation murs Pas-de-Calais',
    image: '/images/isolation-ext.jpg',
    imageAlt: 'Chantier d’isolation extérieure sur une maison individuelle',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 6v6l4 2"/>
        <path d="M2 12h4M18 12h4M12 2v4M12 18v4"/>
      </svg>
    ),
    title: 'Pompe à chaleur air/eau',
    slug: 'pac-air-eau',
    description: 'La solution de chauffage la plus performante. Jusqu\'à 3 fois moins d\'énergie consommée qu\'un chauffage électrique classique.',
    savings: 'Jusqu\'à 60% d\'économies',
    keywords: 'pompe à chaleur Saint-Quentin Lille',
    image: '/images/pompe-a-chaleur.jpg',
    imageAlt: 'Installation technique de pompe à chaleur avec artisans Effy',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>
      </svg>
    ),
    title: 'Pompe à chaleur air/air',
    slug: 'pac-air-air',
    description: 'Chauffage et climatisation réversible en un seul équipement. Idéal pour les logements sans réseau hydraulique.',
    savings: 'Jusqu\'à 50% d\'économies',
    keywords: 'PAC air air Hauts-de-France',
    image: '/images/clim.jpg',
    imageAlt: 'Pose d’une climatisation réversible murale',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M17 8h1a4 4 0 010 8h-1"/>
        <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Poêle à granulés',
    slug: 'poele-granules',
    description: 'Chaleur douce et naturelle avec du bois compressé. Un équipement écologique, performant et éligible aux aides CEE.',
    savings: 'Jusqu\'à 40% d\'économies',
    keywords: 'poêle granulés pellets Nord',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.728 12.728.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.95 4.95l.707-.707"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    title: 'Photovoltaïque',
    slug: 'photovoltaique',
    description: 'Produisez votre propre électricité et réduisez drastiquement vos factures. Autoconsommation, revente ou stockage.',
    savings: 'Jusqu\'à 70% d\'économies',
    keywords: 'photovoltaïque Hauts-de-France',
    image: '/images/photovoltaique.jpg',
    imageAlt: 'Panneaux photovoltaïques installés sur une toiture',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'Chauffe-eau thermodynamique',
    slug: 'chauffe-eau-thermodynamique',
    description: 'Eau chaude sanitaire 3 fois moins chère qu\'avec un chauffe-eau électrique classique. Très éligible aux aides.',
    savings: 'Jusqu\'à 65% d\'économies',
    keywords: 'chauffe-eau thermodynamique CET Nord',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Audit énergétique & bilan thermique',
    slug: 'audit-energetique',
    description: 'Bilan thermique et diagnostic complet de votre logement avec Teddy. Essentiel pour prioriser les travaux et les aides.',
    savings: 'Optimisez vos aides',
    keywords: 'audit énergétique Hauts-de-France',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9h1M9 13h1M9 17h1M16 13h1M16 17h1" />
      </svg>
    ),
    title: 'Rénovation générale int./ext.',
    slug: 'renovation-generale',
    description: 'Carrelage, électricité, plomberie, revêtements de sols, aménagements extérieurs et remise en état générale du logement.',
    savings: 'Projet coordonné',
    keywords: 'rénovation générale intérieur extérieur Hauts-de-France',
    image: '/images/moquette-de-pierre.jpg',
    imageAlt: 'Revêtement extérieur en moquette de pierre devant une maison',
  },
]

export default function Services() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAFC]" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="green" className="mb-4">Nos prestations</Badge>
          <h2 id="services-title" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Tous vos travaux de rénovation<br className="hidden sm:block" /> en Hauts-de-France
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            De l&apos;isolation aux travaux intérieurs et extérieurs, Teddy vous aide à cadrer un projet
            cohérent : bilan thermique, aides possibles, artisans et rénovation générale.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group relative bg-white rounded-card border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden"
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1EB564] via-[#8EF0B9] to-[#F97316]"
                initial={{ scaleX: 0, transformOrigin: '0% 50%' }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + (i % 4) * 0.08 }}
                aria-hidden="true"
              />
              {service.image && (
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.imageAlt ?? service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 via-transparent to-transparent" aria-hidden="true" />
                </div>
              )}
              <div className="p-6 flex-1">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -4, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="h-14 w-14 rounded-xl bg-[#E8F8EF] text-[#1EB564] flex items-center justify-center mb-4 group-hover:bg-[#1EB564] group-hover:text-white transition-all duration-300"
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="font-bold text-[#0F172A] text-base mb-2 group-hover:text-[#1EB564] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Savings */}
                <div className="flex items-center gap-1.5 text-[#0D7A3E] text-sm font-semibold mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                  </svg>
                  {service.savings}
                </div>

                {/* Badge */}
                <Badge variant="orange">Éligible aux aides</Badge>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <button
                  onClick={scrollToContact}
                  className="w-full text-center py-2.5 px-4 border-2 border-[#1EB564] text-[#1EB564] rounded-btn text-sm font-semibold hover:bg-[#1EB564] hover:text-white transition-all duration-200 group-hover:shadow-md group-hover:shadow-[#1EB564]/20"
                  aria-label={`Demander une étude gratuite pour ${service.title}`}
                >
                  Étude gratuite →
                </button>
                <Link
                  href={`/travaux/${service.slug}`}
                  className="mt-3 block text-center text-xs font-semibold text-slate-400 transition-colors hover:text-[#1EB564]"
                >
                  En savoir plus
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 mb-4">
            Vous ne savez pas quel travaux sont prioritaires ?
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-[#1EB564] text-white px-8 py-3.5 rounded-btn font-semibold hover:bg-[#0D7A3E] transition-colors shadow-md hover:shadow-lg"
            aria-label="Demander une étude personnalisée gratuite"
          >
            Demander une étude personnalisée
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
