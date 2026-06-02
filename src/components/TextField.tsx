import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | null
}

/** Mobile-first labeled input. font-size is 16px to avoid iOS focus zoom. */
export function TextField({ label, error, className = '', ...props }: TextFieldProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-serif text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className={[
          'w-full rounded-2xl border bg-surface px-4 py-3 text-base text-ink',
          'placeholder:text-ink-muted/70 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/60',
          error ? 'border-error' : 'border-border',
          className,
        ].join(' ')}
        {...props}
      />
      {error && (
        <span className="font-mono text-xs text-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
