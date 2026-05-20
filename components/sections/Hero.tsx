'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Button from '@/components/ui/Button'

function useCountUp(target: number, duration: number = 2000, active: boolean = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])

  return count
}

const stats = [
  { value: 500000, suffix: '+', label: 'Familles accompagnées', prefix: '' },
  { value: 5000, suffix: '+', label: 'Artisans RGE partenaires', prefix: '' },
  { value: 17, suffix: ' ans', label: "D'expertise Effy", prefix: '' },
]

function AnimatedStat({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.value, 2200, active)

  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold text-white">
        {stat.prefix}
        {count.toLocaleString('fr-FR')}
        {stat.suffix}
      </p>
      <p className="text-white/70 text-sm mt-1">{stat.label}</p>
    </div>
  )
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(statsRef, { once: true, margin: '-100px' })

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="accueil"
      className="relative flex min-h-[920px] items-start overflow-hidden md:min-h-screen md:items-center"
      aria-label="Bienvenue sur Renoted"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 36, rotate: 1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
        className="hidden xl:block absolute bottom-24 right-[max(2rem,calc((100vw-80rem)/2))] z-10 w-80 2xl:bottom-28"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
          className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
                Rendez-vous
              </p>
              <p className="text-lg font-bold">Créneau prioritaire</p>
            </div>
            <span className="rounded-full bg-[#1EB564] px-3 py-1 text-xs font-bold">
              24h
            </span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Appel de qualification', value: '10 min' },
              { label: 'Aides estimées', value: 'gratuit' },
              { label: 'Visite technique', value: 'RGE' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.12 }}
                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3"
              >
                <span className="text-sm text-white/75">{item.label}</span>
                <span className="text-sm font-bold text-[#8EF0B9]">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-2 rounded-full bg-[#1EB564]"
              initial={{ width: '12%' }}
              animate={{ width: ['12%', '72%', '48%', '92%'] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            />
          </div>
          <p className="mt-3 text-xs text-white/55">
            Simulation personnalisée avant devis, sans engagement.
          </p>
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-28 md:py-36">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-[#FFD400]/20 border border-[#FFD400]/50 text-[#FFE66D] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#FFD400] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD400]"></span>
              </span>
              ✓ Mandataire officiel Effy — Hauts-de-France
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 text-balance"
          >
            Rénovation Énergétique{' '}
            <span className="text-[#1EB564]">Hauts-de-France</span>
            <br />
            Jusqu&apos;à{' '}
            <span className="relative inline-block">
              <span className="relative z-10">0€ selon éligibilité</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#1EB564]/25 -skew-x-2" aria-hidden="true"></span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
          >
            Teddy Lecomte, votre conseiller local Effy, vous accompagne de A à Z dans vos
            travaux de rénovation énergétique. Isolation, pompe à chaleur, photovoltaïque —
            <strong className="text-white"> aides optimisées, avance de frais étudiée.</strong>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              size="xl"
              onClick={scrollToContact}
              className="text-base shadow-lg shadow-[#1EB564]/30 hover:shadow-[#1EB564]/50"
            >
              🏠 Estimer mes aides gratuitement
            </Button>
            <a
              href="tel:+33624291096"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-semibold rounded-btn hover:bg-white/20 transition-all duration-200 text-base backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
              Appeler Teddy
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            {[
              { icon: 'E', text: 'Partenaire officiel Effy', effy: true },
              { icon: '🏅', text: 'Artisans RGE certifiés' },
              { icon: '€', text: 'Reste à charge optimisé' },
              { icon: '⭐', text: 'Accompagnement local' },
            ].map((badge) => (
              <span
                key={badge.text}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20"
              >
                <span className={badge.effy ? 'text-[#FFD400] font-extrabold' : 'text-[#1EB564]'}>
                  {badge.icon}
                </span>
                {badge.text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} active={isInView} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-white/50 text-xs font-medium">Découvrir</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-[#1EB564] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
