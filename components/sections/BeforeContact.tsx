'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const steps = [
  {
    number: '1',
    title: 'Vous décrivez le logement',
    text: 'Type de chauffage, isolation existante, commune, facture approximative et objectif principal.',
  },
  {
    number: '2',
    title: 'Teddy vous rappelle',
    text: 'Un échange court permet de valider les priorités et d’éviter les travaux qui ne servent pas votre situation.',
  },
  {
    number: '3',
    title: 'Les aides sont estimées',
    text: "Renoted vérifie les dispositifs mobilisables et vous donne une première lecture du reste à charge.",
  },
  {
    number: '4',
    title: 'Le rendez-vous est cadré',
    text: 'Si le projet est cohérent, une visite technique ou un devis peut être organisé avec un artisan RGE.',
  },
]

export default function BeforeContact() {
  return (
    <section className="bg-[#F8FAFC] py-20 md:py-24" aria-labelledby="before-contact-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="green" className="mb-4">Avant le devis</Badge>
          <h2 id="before-contact-title" className="text-3xl font-extrabold text-[#0F172A] md:text-4xl">
            Un premier échange suffit pour savoir si votre projet vaut le coup.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Le formulaire sert à préparer un rappel utile, pas à vous enfermer dans un devis.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-lg font-extrabold text-white">
                {step.number}
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p>
              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-18px] top-10 z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-[#1EB564]/30 bg-white text-[#1EB564] md:flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#1EB564]/20 bg-[#0D7A3E] px-6 py-5 text-white shadow-card md:flex-row"
        >
          <p className="text-center text-sm font-semibold md:text-left">
            Vous n’avez pas besoin d’avoir toutes les réponses : Teddy vous aide à poser les bonnes questions.
          </p>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-btn bg-white px-5 py-3 text-sm font-bold text-[#0D7A3E] transition-colors hover:bg-[#E8F8EF]"
          >
            Préparer mon rappel
          </a>
        </motion.div>
      </div>
    </section>
  )
}
