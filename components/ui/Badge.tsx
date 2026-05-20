import { clsx } from 'clsx'

type BadgeVariant = 'green' | 'orange' | 'blue' | 'gray'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-[#E8F8EF] text-[#0D7A3E] border border-[#1EB564]/20',
  orange: 'bg-orange-50 text-[#EA580C] border border-[#F97316]/20',
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  gray: 'bg-slate-100 text-slate-600 border border-slate-200',
}

export default function Badge({ children, variant = 'green', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
