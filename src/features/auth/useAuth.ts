import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import type { AuthCredentials, AuthResult } from './auth.types'

/** Fakes network latency so demo-mode interactions feel real (loading spinners). */
const DEMO_DELAY_MS = 700
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Auth actions backed by Supabase: email/password sign in & sign up, and
 * Google OAuth. Returns a localized error string (Argentine Spanish) on failure
 * so screens can render it directly.
 *
 * When Supabase is not configured (see isSupabaseConfigured), runs in "demo
 * mode": auth is simulated locally so the screen can be tried without a backend.
 */
export function useAuth() {
  const [loading, setLoading] = useState(false)

  async function signIn({ email, password }: AuthCredentials): Promise<AuthResult> {
    setLoading(true)
    if (!isSupabaseConfigured) {
      await delay(DEMO_DELAY_MS)
      console.info('[demo] signIn', { email, password })
      setLoading(false)
      return { error: null }
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    return { error: error ? translateError(error.message) : null }
  }

  async function signUp({ email, password }: AuthCredentials): Promise<AuthResult> {
    setLoading(true)
    if (!isSupabaseConfigured) {
      await delay(DEMO_DELAY_MS)
      console.info('[demo] signUp', { email, password })
      setLoading(false)
      return { error: null }
    }
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    return { error: error ? translateError(error.message) : null }
  }

  async function signInWithGoogle(): Promise<AuthResult> {
    setLoading(true)
    if (!isSupabaseConfigured) {
      await delay(DEMO_DELAY_MS)
      console.info('[demo] signInWithGoogle')
      setLoading(false)
      return { error: null }
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    // On success the browser is redirected to Google, so we only reach here on error.
    setLoading(false)
    return { error: error ? translateError(error.message) : null }
  }

  return { loading, signIn, signInWithGoogle, signUp }
}

/** Maps common Supabase auth error messages to Argentine Spanish copy. */
function translateError(message: string): string {
  const normalized = message.toLowerCase()
  if (normalized.includes('invalid login credentials')) {
    return 'El correo o la contraseña no son correctos.'
  }
  if (normalized.includes('user already registered')) {
    return 'Ya existe una cuenta con ese correo.'
  }
  if (normalized.includes('password should be at least')) {
    return 'La contraseña es demasiado corta.'
  }
  if (normalized.includes('email not confirmed')) {
    return 'Todavía no confirmaste tu correo. Revisá tu casilla.'
  }
  return 'Algo salió mal. Probá de nuevo en un momento.'
}
