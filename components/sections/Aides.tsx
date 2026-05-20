'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const aides = [
  {
    name: "MaPrimeRénov'",
    icon: '🏠',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    tagColor: 'bg-blue-100 text-blue-800',
    description: "Aide nationale de l'État, calculée selon vos revenus, votre logement et le parcours choisi.",
    montant: 'Par geste ou rénovation d’ampleur',
    conditions: ['Propriétaire occupant ou bailleur', 'Artisan RGE obligatoire', 'Logement souvent >15 ans'],
  },
  {
    name: 'CEE',
    icon: '⚡',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    tagColor: 'bg-amber-100 text-amber-800',
    description: "Certificats d'Économie d'Énergie. Prime portée par les fournisseurs d'énergie.",
    montant: 'Variable selon travaux',
    conditions: ['Tous revenus', 'Logement ancien', 'Cumul possible selon dossier'],
  },
  {
    name: 'Éco-PTZ',
    icon: '💳',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    tagColor: 'bg-green-100 text-green-800',
    description: 'Prêt à taux 0% pour financer tout ou partie du reste à charge de vos travaux.',
    montant: "Jusqu'à 50 000€",
    conditions: ['Propriétaire', 'Logement >2 ans', 'Artisans RGE'],
  },
  {
    name: 'TVA 5,5%',
    icon: '🔖',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    tagColor: 'bg-purple-100 text-purple-800',
    description: 'Taux réduit sur les travaux de rénovation énergétique éligibles.',
    montant: 'Au lieu de 20%',
    conditions: ['Logement >2 ans', 'Sur facture', 'Selon nature des travaux'],
  },
  {
    name: 'Prime Effy',
    icon: '🎁',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    tagColor: 'bg-yellow-100 text-yellow-800',
    description: "Prime énergie possible en complément selon les travaux et le montage du dossier.",
    montant: 'Complément possible',
    conditions: ['Via Effy', 'Selon travaux', 'Dossier validé avant devis'],
  },
]

const revenueRanges = [
  { label: 'Très modestes (Bleu)', key: 'very_low', gestureRate: 0.55, globalRate: 0.8, color: '#1d4ed8' },
  { label: 'Modestes (Jaune)', key: 'low', gestureRate: 0.4, globalRate: 0.6, color: '#d97706' },
  { label: 'Intermédiaires (Violet)', key: 'mid', gestureRate: 0.25, globalRate: 0.45, color: '#7c3aed' },
  { label: 'Supérieurs (Rose)', key: 'high', gestureRate: 0.08, globalRate: 0.1, color: '#db2777' },
]

const workTypes = [
  { label: 'Isolation des combles', baseAmount: 5000, ceeRate: 0.12 },
  { label: 'Isolation des murs', baseAmount: 12000, ceeRate: 0.1 },
  { label: 'Pompe à chaleur air/eau', baseAmount: 14000, ceeRate: 0.12 },
  { label: 'Chauffe-eau thermodynamique', baseAmount: 3500, ceeRate: 0.1 },
  { label: 'Poêle à granulés', baseAmount: 6500, ceeRate: 0.1 },
  { label: 'Audit énergétique / bilan thermique', baseAmount: 900, ceeRate: 0 },
  { label: 'Photovoltaïque', baseAmount: 10000, ceeRate: 0 },
]

const globalProjects = [
  { label: 'Projet compact', amount: 30000 },
  { label: 'Projet complet', amount: 45000 },
  { label: 'Projet lourd', amount: 70000 },
]

const globalGains = [
  { label: 'Gain de 2 classes DPE', cap: 30000, classes: 2 },
  { label: 'Gain de 3 classes ou plus', cap: 40000, classes: 3 },
]

function formatEuro(value: number) {
  return `${Math.round(value).toLocaleString('fr-FR')}€`
}

export default function Aides() {
  const [selectedRevenue, setSelectedRevenue] = useState<string | null>(null)
  const [selectedWork, setSelectedWork] = useState<number | null>(null)
  const [selectedGlobalRevenue, setSelectedGlobalRevenue] = useState<string | null>(null)
  const [selectedGlobalProject, setSelectedGlobalProject] = useState(1)
  const [selectedGlobalGain, setSelectedGlobalGain] = useState(0)

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const estimated = (() => {
    if (selectedRevenue === null || selectedWork === null) return null
    const range = revenueRanges.find((r) => r.key === selectedRevenue)
    const work = workTypes[selectedWork]
    if (!range || !work) return null

    const prime = Math.round(work.baseAmount * range.gestureRate)
    const cee = Math.round(work.baseAmount * work.ceeRate)
    const total = Math.min(prime + cee, work.baseAmount * 0.9)
    const restACharge = Math.max(0, work.baseAmount - total)

    return { prime, cee, total, restACharge, workAmount: work.baseAmount }
  })()

  const globalEstimated = (() => {
    if (selectedGlobalRevenue === null) return null
    const range = revenueRanges.find((r) => r.key === selectedGlobalRevenue)
    const project = globalProjects[selectedGlobalProject]
    const gain = globalGains[selectedGlobalGain]
    if (!range || !project || !gain) return null

    const eligibleAmount = Math.min(project.amount, gain.cap)
    const aid = eligibleAmount * range.globalRate
    const restACharge = Math.max(0, project.amount - aid)

    return {
      aid,
      restACharge,
      eligibleAmount,
      projectAmount: project.amount,
      cap: gain.cap,
      rate: range.globalRate,
      classes: gain.classes,
    }
  })()

  return (
    <section id="aides" className="py-20 md:py-28 bg-[#F8FAFC]" aria-labelledby="aides-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="orange" className="mb-4">💰 Aides 2026</Badge>
          <h2 id="aides-title" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Simulateurs d&apos;aides 2026<br className="hidden sm:block" /> pour votre rénovation
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Deux lectures complémentaires : une estimation par geste et une estimation rénovation
            globale. Teddy confirme ensuite les montants selon votre logement, vos revenus et vos devis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {aides.map((aide, i) => (
            <motion.div
              key={aide.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`bg-white rounded-card border ${aide.borderColor} shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-5`}
            >
              <div className={`h-10 w-10 rounded-lg ${aide.bgColor} flex items-center justify-center text-xl mb-3`}>
                {aide.icon}
              </div>
              <h3 className={`font-bold text-base mb-1 ${aide.textColor}`}>{aide.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-3">{aide.description}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${aide.tagColor}`}>
                {aide.montant}
              </span>
              <ul className="mt-3 space-y-1">
                {aide.conditions.map((c) => (
                  <li key={c} className="text-xs text-slate-400 flex items-start gap-1">
                    <span className="text-[#1EB564] mt-0.5">✓</span> {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-card-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#0D7A3E] to-[#1EB564] px-6 py-5">
              <h3 className="text-white font-bold text-xl">🧮 Simulateur par geste 2026</h3>
              <p className="text-white/80 text-sm mt-1">Isolation, chauffage, bilan thermique ou photovoltaïque</p>
            </div>
            <div className="p-6 md:p-7">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                    Votre tranche de revenus
                  </label>
                  <div className="space-y-2">
                    {revenueRanges.map((range) => (
                      <button
                        key={range.key}
                        onClick={() => setSelectedRevenue(range.key)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          selectedRevenue === range.key
                            ? 'border-[#1EB564] bg-[#E8F8EF] text-[#0D7A3E]'
                            : 'border-slate-200 text-slate-600 hover:border-[#1EB564]/40'
                        }`}
                        aria-pressed={selectedRevenue === range.key}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                    Type de travaux envisagés
                  </label>
                  <div className="space-y-2">
                    {workTypes.map((work, i) => (
                      <button
                        key={work.label}
                        onClick={() => setSelectedWork(i)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          selectedWork === i
                            ? 'border-[#1EB564] bg-[#E8F8EF] text-[#0D7A3E]'
                            : 'border-slate-200 text-slate-600 hover:border-[#1EB564]/40'
                        }`}
                        aria-pressed={selectedWork === i}
                      >
                        <span className="flex items-center justify-between gap-3">
                          {work.label}
                          <span className="text-slate-400 text-xs">~{formatEuro(work.baseAmount)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {estimated ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-7 bg-gradient-to-br from-[#E8F8EF] to-white rounded-xl border border-[#1EB564]/30 p-5"
                >
                  <p className="text-sm font-semibold text-[#0D7A3E] mb-4 uppercase tracking-wide">
                    Estimation indicative
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "MaPrimeRénov'", value: estimated.prime, color: 'text-blue-600' },
                      { label: 'Prime CEE', value: estimated.cee, color: 'text-amber-600' },
                      { label: 'Total aides', value: estimated.total, color: 'text-[#1EB564]', bold: true },
                      { label: 'Reste à charge', value: estimated.restACharge, color: 'text-slate-600' },
                    ].map((item) => (
                      <div key={item.label} className="text-center bg-white rounded-lg p-3 shadow-sm">
                        <p className={`text-xl font-extrabold ${item.color} ${item.bold ? 'text-2xl' : ''}`}>
                          {formatEuro(item.value)}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <Button onClick={scrollToContact} size="lg" className="mt-5 w-full">
                    Demander mon étude gratuite →
                  </Button>
                </motion.div>
              ) : (
                <div className="mt-7 text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400 text-sm">
                    Sélectionnez vos revenus et un type de travaux.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-card-lg overflow-hidden"
          >
            <div className="bg-[#0F172A] px-6 py-5">
              <h3 className="text-white font-bold text-xl">🏡 Simulateur rénovation globale</h3>
              <p className="text-white/75 text-sm mt-1">Parcours rénovation d&apos;ampleur, gain DPE et plafonds 2026</p>
            </div>
            <div className="p-6 md:p-7">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                    Votre tranche de revenus
                  </label>
                  <div className="space-y-2">
                    {revenueRanges.map((range) => (
                      <button
                        key={range.key}
                        onClick={() => setSelectedGlobalRevenue(range.key)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          selectedGlobalRevenue === range.key
                            ? 'border-[#1EB564] bg-[#E8F8EF] text-[#0D7A3E]'
                            : 'border-slate-200 text-slate-600 hover:border-[#1EB564]/40'
                        }`}
                        aria-pressed={selectedGlobalRevenue === range.key}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                    Montant estimé du bouquet de travaux
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {globalProjects.map((project, index) => (
                      <button
                        key={project.label}
                        onClick={() => setSelectedGlobalProject(index)}
                        className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                          selectedGlobalProject === index
                            ? 'border-[#1EB564] bg-[#E8F8EF] text-[#0D7A3E]'
                            : 'border-slate-200 text-slate-600 hover:border-[#1EB564]/40'
                        }`}
                      >
                        <span className="block">{project.label}</span>
                        <span className="mt-1 block text-xs text-slate-400">{formatEuro(project.amount)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                    Gain énergétique visé
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {globalGains.map((gain, index) => (
                      <button
                        key={gain.label}
                        onClick={() => setSelectedGlobalGain(index)}
                        className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                          selectedGlobalGain === index
                            ? 'border-[#1EB564] bg-[#E8F8EF] text-[#0D7A3E]'
                            : 'border-slate-200 text-slate-600 hover:border-[#1EB564]/40'
                        }`}
                      >
                        <span className="block">{gain.label}</span>
                        <span className="mt-1 block text-xs text-slate-400">Plafond {formatEuro(gain.cap)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {globalEstimated ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-7 rounded-xl border border-[#1EB564]/30 bg-[#E8F8EF] p-5"
                >
                  <p className="text-sm font-semibold text-[#0D7A3E] mb-4 uppercase tracking-wide">
                    Estimation rénovation globale
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                      <p className="text-xl font-extrabold text-[#0F172A]">{formatEuro(globalEstimated.projectAmount)}</p>
                      <p className="mt-1 text-xs text-slate-500">Projet estimé</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                      <p className="text-xl font-extrabold text-blue-600">{formatEuro(globalEstimated.eligibleAmount)}</p>
                      <p className="mt-1 text-xs text-slate-500">Dépenses retenues</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                      <p className="text-2xl font-extrabold text-[#1EB564]">{formatEuro(globalEstimated.aid)}</p>
                      <p className="mt-1 text-xs text-slate-500">Aide indicative</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 text-center shadow-sm">
                      <p className="text-xl font-extrabold text-slate-600">{formatEuro(globalEstimated.restACharge)}</p>
                      <p className="mt-1 text-xs text-slate-500">Reste à charge</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    Calcul indicatif basé sur un gain de {globalEstimated.classes} classes ou plus,
                    un taux de {(globalEstimated.rate * 100).toFixed(0)}% et le plafond 2026 correspondant.
                  </p>
                  <Button onClick={scrollToContact} size="lg" className="mt-5 w-full">
                    Demander mon étude globale →
                  </Button>
                </motion.div>
              ) : (
                <div className="mt-7 text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400 text-sm">
                    Sélectionnez votre tranche de revenus pour simuler une rénovation globale.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-slate-400">
          Simulations non contractuelles, basées sur les parcours MaPrimeRénov&apos; 2026 publiés par
          France Rénov&apos; et l&apos;Anah. Le montant final dépend du logement, des devis, de l&apos;audit,
          des revenus, du gain énergétique et des règles applicables au moment du dépôt.
        </p>
      </div>
    </section>
  )
}
