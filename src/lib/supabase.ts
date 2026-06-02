import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Whether real Supabase credentials are configured. When false the app runs in
 * "demo mode" (UI only, auth is simulated) so screens can be developed before
 * the Supabase project is wired up.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    '[Vox Austral] Running in demo mode: Supabase env vars are missing. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to enable real auth.',
  )
}

// In demo mode we still construct a client (createClient throws on empty
// values), but with harmless placeholders. Its methods are never called because
// useAuth short-circuits when isSupabaseConfigured is false.
const DEMO_URL = 'http://localhost:54321'
const DEMO_KEY = 'demo-anon-key'

export const supabase = createClient(
  supabaseUrl || DEMO_URL,
  supabaseAnonKey || DEMO_KEY,
)
