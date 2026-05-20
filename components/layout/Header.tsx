'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Button from '@/components/ui/Button'
import { trackEvent } from '@/lib/tracking'

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Nos services', href: '#services' },
  { label: 'Aides', href: '#aides' },
  { label: 'Photovoltaïque', href: '#photovoltaique' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#accueil"
              onClick={(e) => { e.preventDefault(); handleNav('#accueil') }}
              className="flex items-center gap-2 group"
              aria-label="Renoted — Retour à l'accueil"
            >
              <span
                className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                Renoted
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1EB564] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1EB564]"></span>
              </span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <motion.button
                    onClick={() => handleNav(link.href)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isScrolled
                        ? 'text-slate-600 hover:text-[#1EB564] hover:bg-[#E8F8EF]'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+33624291096"
                onClick={() => trackEvent('phone_click', { placement: 'header' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-btn text-sm font-semibold transition-all duration-200 ${
                  isScrolled
                    ? 'text-[#0F172A] hover:text-[#1EB564]'
                    : 'text-white hover:text-white/80'
                }`}
                aria-label="Appeler Teddy au 06.24.29.10.96"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                06.24.29.10.96
              </a>
              <Button
                size="md"
                onClick={() => handleNav('#contact')}
                className="shadow-md shadow-[#1EB564]/20 hover:shadow-lg hover:shadow-[#1EB564]/30"
              >
                Devis Gratuit
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Ouvrir le menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </nav>
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#1EB564]"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-30 bg-white border-b border-slate-200 shadow-lg lg:hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="flex w-full items-center px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-[#E8F8EF] hover:text-[#1EB564] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <a
                  href="tel:+33624291096"
                  onClick={() => trackEvent('phone_click', { placement: 'mobile_menu' })}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-50 text-[#0F172A] font-semibold hover:bg-slate-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#1EB564]">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                  06.24.29.10.96
                </a>
                <Button fullWidth onClick={() => handleNav('#contact')}>
                  Devis Gratuit
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
