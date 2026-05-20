'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const testimonials = [
  {
    id: 1,
    name: 'Marie-Claire D.',
    city: 'Saint-Quentin (02)',
    works: 'Isolation des combles + PAC air/eau',
    note: 5,
    date: 'Janvier 2025',
    text: "Teddy nous a vraiment pris en main de A à Z. On ne savait pas qu'on pouvait avoir autant d'aides ! Le reste à charge a été fortement réduit. Les artisans étaient sérieux et propres. La maison est transformée, on a déjà économisé sur notre facture de gaz.",
    savings: 'Reste à charge réduit',
  },
  {
    id: 2,
    name: 'Jean-Paul M.',
    city: 'Lens (62)',
    works: 'Photovoltaïque',
    note: 5,
    date: 'Mars 2025',
    text: "Super expérience avec Renoted. Teddy est disponible, répond rapidement et explique clairement les aides disponibles. Installation en 2 jours, on produit maintenant notre propre électricité. Facture divisée par 3 en été !",
    savings: '-68% sur la facture électrique',
  },
  {
    id: 3,
    name: 'Sylvie B.',
    city: 'Valenciennes (59)',
    works: 'Poêle à granulés + isolation sol',
    note: 5,
    date: 'Avril 2025',
    text: "Mandataire Effy mais avec une touche vraiment humaine et locale. Teddy connaît bien les spécificités de notre région. Les dossiers ont été montés rapidement et les aides versées sans problème. Je recommande chaudement !",
    savings: 'MaPrimeRénov\' + CEE obtenus',
  },
]

function StarRating({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${note} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < note ? '#F97316' : '#E2E8F0'}
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  return (
    <section
      id="temoignages"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="temoignages-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="green" className="mb-4">⭐ Avis clients</Badge>
          <h2 id="temoignages-title" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Ce que disent nos clients<br className="hidden sm:block" /> en Hauts-de-France
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Des exemples de retours clients de familles accompagnées par Renoted en Hauts-de-France.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.article
              key={testimonials[current].id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-8 md:p-10"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                {/* Avatar */}
                <div
                  className="h-14 w-14 rounded-full bg-gradient-to-br from-[#1EB564] to-[#0D7A3E] flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {testimonials[current].name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-bold text-[#0F172A] text-lg">{testimonials[current].name}</span>
                    <span className="text-slate-400 text-sm">{testimonials[current].city}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StarRating note={testimonials[current].note} />
                    <span className="text-slate-400 text-xs">{testimonials[current].date}</span>
                  </div>
                  <p className="text-[#1EB564] text-xs font-semibold mt-1">
                    Travaux : {testimonials[current].works}
                  </p>
                </div>
                {/* Savings badge */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1 bg-[#E8F8EF] text-[#0D7A3E] text-xs font-bold px-3 py-1.5 rounded-full border border-[#1EB564]/20">
                    ✓ {testimonials[current].savings}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote>
                <svg
                  className="w-8 h-8 text-[#1EB564]/30 mb-3"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-slate-600 text-base leading-relaxed italic">
                  {testimonials[current].text}
                </p>
              </blockquote>
            </motion.article>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#1EB564] hover:text-[#1EB564] transition-all"
              aria-label="Témoignage précédent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Témoignages">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-[#1EB564]' : 'w-2 bg-slate-300'
                  }`}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Aller au témoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#1EB564] hover:text-[#1EB564] transition-all"
              aria-label="Témoignage suivant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* External review link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.effy.fr/avis-effy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1EB564] font-semibold hover:text-[#0D7A3E] transition-colors text-sm"
          >
            Voir les avis Effy
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
