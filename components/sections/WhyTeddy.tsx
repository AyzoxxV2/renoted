'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const reasons = [
  {
    label: 'Conseiller local',
    title: 'Un interlocuteur unique, pas une plateforme anonyme',
    text: 'Teddy connaît les logements des Hauts-de-France, les priorités de confort et les questions que se posent les propriétaires avant de se lancer.',
  },
  {
    label: 'Lecture claire',
    title: 'Des aides expliquées avant le devis',
    text: "Vous comprenez les aides possibles, les limites d'éligibilité et le reste à charge estimé avant de prendre une décision.",
  },
  {
    label: 'RGE',
    title: 'Des artisans qualifiés pour préserver vos aides',
    text: "Les travaux sont orientés vers des professionnels RGE afin de garder un projet cohérent, conforme et finançable.",
  },
  {
    label: 'Suivi',
    title: 'Un accompagnement jusqu’au chantier',
    text: "Renoted vous aide à garder le fil entre estimation, devis, dossier d'aides, rendez-vous technique et lancement des travaux.",
  },
]

export default function WhyTeddy() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="why-teddy-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <Badge variant="green" className="mb-4">Pourquoi Renoted</Badge>
            <h2 id="why-teddy-title" className="text-3xl font-extrabold leading-tight text-[#0F172A] md:text-4xl">
              Plus humain qu’un comparateur, plus clair qu’un devis seul.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Le but n’est pas de vous pousser vers des travaux au hasard. On commence par comprendre
              votre logement, votre budget et les aides réalistes, puis on construit une solution utile.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC]">
              {[
                ['Sans accompagnement', 'aides floues, devis difficiles à comparer, risque de mauvais ordre de travaux'],
                ['Avec Renoted', 'priorités claires, reste à charge expliqué, interlocuteur local joignable'],
              ].map(([title, text], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  className={`p-5 ${index === 1 ? 'bg-[#E8F8EF]' : 'border-b border-slate-200 bg-white'}`}
                >
                  <p className="text-sm font-bold text-[#0F172A]">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-5 inline-flex h-9 items-center rounded-full border border-[#1EB564]/20 bg-[#E8F8EF] px-3 text-xs font-bold uppercase tracking-wide text-[#0D7A3E]">
                  {reason.label}
                </div>
                <h3 className="text-lg font-bold leading-snug text-[#0F172A]">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{reason.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
