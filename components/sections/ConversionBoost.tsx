'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const highlights = [
  {
    value: '24h',
    label: 'pour être rappelé',
    text: 'Un premier échange court pour comprendre votre logement et vos priorités.',
  },
  {
    value: 'Bilan',
    label: 'thermique gratuit',
    text: 'Lecture thermique du logement, des pertes de chaleur et des travaux vraiment utiles.',
  },
  {
    value: 'RGE',
    label: 'artisans qualifiés',
    text: 'Des travaux éligibles aux dispositifs publics et aux primes énergie.',
  },
]

export default function ConversionBoost() {
  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-white py-16" aria-labelledby="rdv-title">
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1EB564] to-transparent"
        initial={{ x: '-60%' }}
        whileInView={{ x: '60%' }}
        viewport={{ once: false }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <Badge variant="green" className="mb-4">Objectif rendez-vous</Badge>
          <h2 id="rdv-title" className="text-3xl font-extrabold text-[#0F172A] md:text-4xl">
            Un parcours clair pour déclencher votre projet
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
            Votre demande va droit au but : un appel, une estimation d’aides, puis un rendez-vous
            technique si le projet est pertinent. Chaque étape vous aide à décider plus sereinement.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center rounded-btn bg-[#1EB564] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1EB564]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0D7A3E] hover:shadow-xl"
            >
              Demander mon rappel gratuit
            </button>
            <a
              href="tel:+33624291096"
              className="inline-flex items-center justify-center rounded-btn border-2 border-slate-200 px-6 py-3 text-sm font-bold text-[#0F172A] transition-colors hover:border-[#1EB564] hover:text-[#1EB564]"
            >
              Appeler maintenant
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative min-h-[210px] overflow-hidden rounded-card border border-slate-200 bg-[#F8FAFC] p-5 shadow-card"
            >
              <div className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-[#1EB564]/70" aria-hidden="true" />
              <p className="relative text-4xl font-extrabold text-[#1EB564]">{item.value}</p>
              <h3 className="relative mt-2 font-bold text-[#0F172A]">{item.label}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-500">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
