export type AuthMode = 'signIn' | 'signUp'

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResult {
  error: string | null
}
