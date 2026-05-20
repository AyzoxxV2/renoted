'use client'

import { trackEvent } from '@/lib/tracking'

export default function PhoneButton() {
  return (
    <a
      href="tel:+33624291096"
      onClick={() => trackEvent('phone_click', { placement: 'floating_mobile' })}
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-[#1EB564] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#0D7A3E] transition-all duration-300 hover:scale-105 active:scale-95 md:hidden"
      aria-label="Appeler Teddy Lecomte au 06.24.29.10.96"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-semibold text-sm whitespace-nowrap">06.24.29.10.96</span>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
    </a>
  )
}
