'use client'

import { forwardRef } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'orange'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  href?: string
  as?: 'button' | 'a'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1EB564] text-white hover:bg-[#0D7A3E] shadow-sm hover:shadow-md active:scale-[0.98]',
  secondary:
    'bg-white text-[#1EB564] border-2 border-[#1EB564] hover:bg-[#E8F8EF] active:scale-[0.98]',
  outline:
    'bg-transparent text-white border-2 border-white hover:bg-white/10 active:scale-[0.98]',
  ghost:
    'bg-transparent text-[#0F172A] hover:bg-slate-100 active:scale-[0.98]',
  orange:
    'bg-[#F97316] text-white hover:bg-[#EA580C] shadow-sm hover:shadow-md active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1EB564] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
