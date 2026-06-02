import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'google' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm',
  secondary:
    'bg-secondary text-ink hover:brightness-95 active:brightness-90 shadow-sm',
  google:
    'bg-surface text-ink border border-border hover:bg-bg active:bg-bg',
  ghost: 'bg-transparent text-ink-muted hover:text-ink',
}

/** Mobile-first button: large tap target, palette-aware variants. */
export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5',
        'font-serif text-base font-semibold transition-all duration-150',
        'disabled:cursor-not-allowed disabled:opacity-60',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {loading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  )
}
