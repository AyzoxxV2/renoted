import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-card border border-slate-200 shadow-card',
        hover && 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
