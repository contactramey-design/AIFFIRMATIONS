export const COLORS = {
  lavender: '#F0E6FF',
  sky: '#E0F7FA',
  /** Stronger gradient (more contrast for readability) */
  gradientStart: '#C9B0F0',
  gradientEnd: '#9DD4DC',
  gold: '#FFE5B4',
  white: '#FFFFFF',
  dark: '#2D2D2D',
} as const;

export const GRADIENTS = {
  primary: ['#F0E6FF', '#E0F7FA'],
  /** More distinct gradient for screens with white text */
  strong: ['#C9B0F0', '#9DD4DC'] as [string, string],
  card: ['#FFFFFF', '#FFF9F0'],
} as const;

/** Use on white/light text over gradient for better contrast */
export const TEXT_SHADOW_LIGHT = {
  textShadowColor: 'rgba(0, 0, 0, 0.35)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 6,
} as const;

export const CATEGORIES = [
  { id: 'big-day', emoji: '✨', label: 'Big Day' },
  { id: 'feeling-down', emoji: '💙', label: 'Feeling Down' },
  { id: 'self-love', emoji: '💖', label: 'Self-Love' },
  { id: 'work-win', emoji: '💼', label: 'Work Win' },
  { id: 'anxiety', emoji: '🌙', label: 'Anxiety' },
  { id: 'gratitude', emoji: '🙏', label: 'Gratitude' },
] as const;

export const FREE_TIER_LIMIT = 5;

export const AI_SYSTEM_PROMPT = `You are Lumi, a compassionate guide of light. Create a short, poetic, first-person affirmation (40-80 words) deeply personal to the user's exact situation. Empowering, warm, believable. Never generic. End with gentle reminder of inner strength.`;
