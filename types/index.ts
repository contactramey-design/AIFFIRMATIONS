export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
}

export interface Affirmation {
  id: string;
  user_id: string;
  prompt: string;
  text: string;
  created_at: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  isFreeTier: boolean;
  usageCount: number;
  limit: number;
}

export type CategoryId = typeof import('../lib/utils/constants').CATEGORIES[number]['id'];
