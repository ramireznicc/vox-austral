/**
 * Vox Austral color palette — pastel / soft, friendly aesthetic.
 * Single source of truth for the palette. The same values are mirrored as
 * Tailwind tokens in src/index.css (@theme). Keep both in sync.
 */
export const colors = {
  bg: '#F7F3EE', // base background (warm cream)
  surface: '#FFFDFB', // cards / panels
  primary: '#6EC1B8', // austral teal — primary action
  primaryDark: '#4FA89E', // primary hover / active
  secondary: '#F0A99E', // soft coral — secondary accents
  accent: '#F4D58D', // warm gold — highlights
  lilac: '#C3B1E1', // aurora lilac — decorative
  ink: '#3B3A4E', // main text (not pure black)
  inkMuted: '#7A7689', // secondary text / placeholders
  border: '#E7DFD4', // borders & dividers
  success: '#9DCBA0', // success states
  error: '#E89B9B', // validation errors
} as const

export type ColorToken = keyof typeof colors
