'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const steps = [
  {
    number: '01',
    icon: '📞',
    title: 'Contactez Teddy',
    description:
      'Appelez ou remplissez le formulaire. Teddy vous répond sous 24h pour comprendre votre situation et votre logement.',
    detail: 'Gratuit et sans engagement',
    color: '#1EB564',
  },
  {
    number: '02',
    icon: '🏠',
    title: 'Bilan thermique du logement',
    description:
      "Teddy analyse votre logement, vos factures et vos priorités. Il identifie les pertes thermiques et les travaux à traiter en premier.",
    detail: 'Visite offerte & bilan complet',
    color: '#0D7A3E',
  },
  {
    number: '03',
    icon: '📋',
    title: 'Devis & Aides calculées',
    description:
      "Vous recevez un devis détaillé avec toutes les aides auxquelles vous avez droit : MaPrimeRénov', CEE, éco-PTZ…",
    detail: 'Aides optimisées et expliquées',
    color: '#1EB564',
  },
  {
    number: '04',
    icon: '🔨',
    title: 'Travaux par artisan RGE',
    description:
      "Les travaux sont réalisés par des artisans certifiés RGE. Teddy suit le chantier et gère vos dossiers d'aides.",
    detail: 'Suivi de chantier inclus',
    color: '#0D7A3E',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="how-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="green" className="mb-4">Processus simple</Badge>
          <h2 id="how-title" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            De votre premier appel jusqu&apos;à la fin des travaux, Teddy vous accompagne à chaque étape.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1EB564] via-[#0D7A3E] to-[#1EB564] mx-[12.5%]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative mb-6 z-10">
                  <div
                    className="h-16 w-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white"
                    style={{ backgroundColor: step.color }}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[#0F172A] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{step.description}</p>
                <span className="inline-flex items-center gap-1 text-[#1EB564] text-xs font-semibold bg-[#E8F8EF] px-3 py-1 rounded-full">
                  ✓ {step.detail}
                </span>

                {/* Arrow (mobile/tablet) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-6 text-[#1EB564]" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mx-auto rotate-90">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-[#0D7A3E] to-[#1EB564] rounded-2xl p-8 md:p-10 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Tout est pris en charge par Renoted</h3>
          <p className="text-white/85 max-w-xl mx-auto mb-6">
            Dossiers d&apos;aides, coordination artisans, suivi des travaux… Vous n&apos;avez rien à gérer.
            Teddy s&apos;occupe de tout pour vous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '✓ Accompagnement 100% gratuit',
              '✓ Dossiers aides gérés',
              '✓ Reste à charge optimisé',
              '✓ Artisans certifiés RGE',
            ].map((item) => (
              <span
                key={item}
                className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
