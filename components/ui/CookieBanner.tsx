'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_KEY = 'renoted_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
          role="dialog"
          aria-label="Consentement aux cookies"
          aria-live="polite"
        >
          <div className="bg-[#0F172A] text-white rounded-2xl shadow-card-lg border border-white/10 p-5">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-xl flex-shrink-0">🍪</span>
              <div>
                <p className="font-bold text-sm mb-1">Cookies & confidentialité</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic
                  de façon anonyme.{' '}
                  <a href="#confidentialite" className="text-[#1EB564] hover:underline">
                    En savoir plus
                  </a>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 bg-[#1EB564] hover:bg-[#0D7A3E] text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={decline}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
