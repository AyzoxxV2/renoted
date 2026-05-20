'use client'

import { motion } from 'framer-motion'

const trustItems = [
  {
    name: 'Effy',
    description: 'N°1 rénovation énergétique',
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-[#FFD400] flex items-center justify-center">
          <span className="text-[#0F172A] font-bold text-sm">E</span>
        </div>
        <span className="font-bold text-[#0F172A] text-lg">Effy</span>
      </div>
    ),
  },
  {
    name: 'RGE',
    description: 'Artisans certifiés RGE',
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-amber-500 flex items-center justify-center">
          <span className="text-white font-bold text-xs">RGE</span>
        </div>
        <span className="font-bold text-[#0F172A]">Reconnu Garant<br />de l&apos;Environnement</span>
      </div>
    ),
  },
  {
    name: 'MaPrimeRénov',
    description: 'Aide nationale',
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">🏠</span>
        </div>
        <span className="font-bold text-[#0F172A]">MaPrimeRénov&apos;</span>
      </div>
    ),
  },
  {
    name: 'Qualibat',
    description: 'Qualification professionnelle',
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-[#0F172A] flex items-center justify-center">
          <span className="text-white font-bold text-xs">QB</span>
        </div>
        <span className="font-bold text-[#0F172A]">Qualibat</span>
      </div>
    ),
  },
  {
    name: 'AntiArnaques',
    description: 'Démarche vérifiée',
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-red-500 flex items-center justify-center">
          <span className="text-white font-bold text-xs">✓</span>
        </div>
        <span className="font-bold text-[#0F172A]">Anti-Arnaques</span>
      </div>
    ),
  },
]

export default function TrustBar() {
  return (
    <section className="bg-white border-y border-slate-200 py-10" aria-label="Certifications et partenaires">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-slate-500 text-sm font-medium mb-8 uppercase tracking-widest"
        >
          Vos travaux entre des mains certifiées
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-center">
                {item.logo}
              </div>
              <span className="text-slate-400 text-xs text-center">{item.description}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
