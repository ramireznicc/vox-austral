import { useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import { useAuth } from './useAuth'
import type { AuthMode } from './auth.types'
import solUrl from '@/assets/vox-austral-sol.svg'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * First screen of Vox Austral: game title + email/password sign in & sign up
 * (toggle) + Google OAuth. Mobile-first, pastel "aurora" aesthetic.
 */
export function AuthScreen() {
  const { loading, signIn, signUp, signInWithGoogle } = useAuth()
  const [mode, setMode] = useState<AuthMode>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const isSignUp = mode === 'signUp'

  function toggleMode() {
    setMode(isSignUp ? 'signIn' : 'signUp')
    setEmailError(null)
    setPasswordError(null)
    setFormError(null)
    setNotice(null)
  }

  function validate(): boolean {
    let valid = true
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Ingresá un correo válido.')
      valid = false
    } else {
      setEmailError(null)
    }
    if (password.length < 6) {
      setPasswordError('La contraseña tiene que tener al menos 6 caracteres.')
      valid = false
    } else {
      setPasswordError(null)
    }
    return valid
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setNotice(null)
    if (!validate()) return

    const action = isSignUp ? signUp : signIn
    const { error } = await action({ email, password })
    if (error) {
      setFormError(error)
      return
    }
    if (isSignUp) {
      setNotice('¡Listo! Revisá tu correo para confirmar la cuenta.')
    }
  }

  async function handleGoogle() {
    setFormError(null)
    setNotice(null)
    const { error } = await signInWithGoogle()
    if (error) setFormError(error)
  }

  return (
    <main className="relative flex min-h-svh flex-col bg-bg px-6 py-4">
      {/* Soft aurora glows in the background (clipped to the viewport) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-lilac/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        {/* Title — stacked on mobile, horizontal on desktop */}
        <header className="mb-5 text-center sm:mb-7">
          <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-3">
            <img
              src={solUrl}
              alt=""
              aria-hidden
              className="-mb-1 w-16 select-none sm:mb-0 sm:shrink-0"
              draggable={false}
            />
            <h1 className="font-display leading-[0.85] text-ink text-5xl sm:text-[2.75rem] sm:leading-none">
              <span className="sm:hidden">
                Vox<br />Austral
              </span>
              <span className="hidden sm:inline">Vox Austral</span>
            </h1>
          </div>
          <p className="mt-3 font-mono text-sm text-ink-muted">
            Tu aventura austral comienza acá.
          </p>
        </header>

        {/* Card */}
        <section className="rounded-3xl border border-border bg-surface/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
          <h2 className="mb-1 font-serif text-xl font-bold text-ink">
            {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>
          <p className="mb-4 font-mono text-xs text-ink-muted">
            {isSignUp
              ? 'Sumate y empezá a jugar.'
              : 'Bienvenido de vuelta, viajero.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
            <TextField
              label="Correo"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="vos@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />
            <TextField
              label="Contraseña"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />

            {formError && (
              <p className="font-mono text-xs text-error" role="alert">
                {formError}
              </p>
            )}
            {notice && (
              <p className="font-mono text-xs text-success" role="status">
                {notice}
              </p>
            )}

            <Button type="submit" variant="primary" loading={loading}>
              {isSignUp ? 'Crear cuenta' : 'Entrar'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-ink-muted">o</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="google" loading={loading} onClick={handleGoogle}>
            <GoogleIcon />
            Continuar con Google
          </Button>
        </section>

        {/* Toggle */}
        <p className="mt-4 text-center font-mono text-xs text-ink-muted">
          {isSignUp ? '¿Ya tenés cuenta?' : '¿Todavía no tenés cuenta?'}{' '}
          <button
            type="button"
            onClick={toggleMode}
            className="font-semibold text-primary-dark underline-offset-2 hover:underline"
          >
            {isSignUp ? 'Iniciá sesión' : 'Creá una'}
          </button>
        </p>
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  )
}
