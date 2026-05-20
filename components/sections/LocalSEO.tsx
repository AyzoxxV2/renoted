'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { cityPages } from '@/lib/seo-pages'

const searches = [
  'rénovation énergétique Hauts-de-France',
  'isolation combles Nord',
  'pompe à chaleur Lille',
  'photovoltaïque Pas-de-Calais',
  'devis rénovation énergétique Saint-Quentin',
  'aides MaPrimeRénov Hauts-de-France',
]

export default function LocalSEO() {
  return (
    <section id="zone-intervention" className="bg-white py-20 md:py-24" aria-labelledby="local-seo-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <Badge variant="green" className="mb-4">Expert local Hauts-de-France</Badge>
            <h2 id="local-seo-title" className="text-3xl font-extrabold text-[#0F172A] md:text-4xl">
              Rénovation énergétique à Lille, Saint-Quentin, Lens, Arras et dans toute la région
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Renoted accompagne les propriétaires des Hauts-de-France sur les travaux les plus
                recherchés: isolation des combles, isolation des murs, pompe à chaleur, poêle à
                granulés, chauffe-eau thermodynamique, audit énergétique, photovoltaïque et rénovation générale.
              </p>
              <p>
                L’objectif est simple: identifier les travaux vraiment utiles, vérifier les aides
                mobilisables, sélectionner des artisans RGE et obtenir un rendez-vous clair avant
                de signer quoi que ce soit.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {searches.map((term, index) => (
                <motion.span
                  key={term}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-full border border-[#1EB564]/20 bg-[#E8F8EF] px-3 py-1.5 text-xs font-semibold text-[#0D7A3E]"
                >
                  {term}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-card-lg"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Villes couvertes
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cityPages.map((page, index) => (
                <motion.div
                  key={page.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.035 }}
                >
                  <Link
                    href={`/villes/${page.slug}`}
                    className="block rounded-xl bg-white px-3 py-3 text-center text-sm font-semibold text-[#0F172A] shadow-sm transition-all hover:-translate-y-0.5 hover:text-[#1EB564] hover:shadow-card"
                  >
                    {page.city}
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              Déplacement possible dans le Nord, le Pas-de-Calais, la Somme, l’Oise et l’Aisne selon
              la nature du projet et les disponibilités du réseau d’artisans.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
