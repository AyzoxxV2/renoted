'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

export default function SolteoWidget() {
  return (
    <section
      id="photovoltaique"
      className="relative overflow-hidden py-20 md:py-28 bg-[#0a2218]"
      aria-labelledby="photovoltaique-title"
    >
      <img
        src="/images/photovoltaique.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2218]/95 via-[#0D7A3E]/90 to-[#1EB564]/75" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge variant="orange" className="mb-4">☀️ Photovoltaïque</Badge>
          <h2 id="photovoltaique-title" className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Estimez votre production photovoltaïque<br className="hidden sm:block" /> en 2 minutes
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Renseignez votre adresse et votre consommation pour obtenir une estimation personnalisée
            de votre production photovoltaïque et de vos économies.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              '☀️ Simulation gratuite',
              '📍 Adapté à votre toiture',
              '💰 Économies calculées',
              '⚡ Résultat en 2 minutes',
            ].map((item) => (
              <span
                key={item}
                className="text-white/90 text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Widget container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-card-lg overflow-hidden border border-white/20"
        >
          {/* Widget header */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-lg">☀️</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Simulateur photovoltaïque Solteo</p>
              <p className="text-white/80 text-xs">Estimation personnalisée · Gratuit · Sans engagement</p>
            </div>
          </div>

          {/* Solteo iframe */}
          {/* Solteo Solar Lead Generator Widget */}
          <iframe
            src="https://app.solteo.fr/lead-magnet?companyId=fc1040e1-9d4c-4100-bd54-bf08d304738c"
            title="Formulaire estimation photovoltaïque Solteo"
            width="100%"
            height="870px"
            frameBorder="0"
            allow="geolocation"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* End Solteo Widget */}
        </motion.div>

        {/* Post-widget reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-white/70 text-sm">
            Après votre simulation, Teddy Lecomte vous contacte pour valider l&apos;étude et vous
            accompagner dans vos démarches.
          </p>
          <a
            href="tel:+33624291096"
            className="inline-flex items-center gap-2 text-white font-semibold mt-3 hover:text-[#1EB564] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
            </svg>
            Plutôt appeler Teddy ? 06.24.29.10.96
          </a>
        </motion.div>
      </div>
    </section>
  )
}
