// User types
export type SubscriptionTier = 'free' | 'pro';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  google_id: string | null;
  subscription_tier: SubscriptionTier;
  subscription_expires_at: number | null;
  created_at: number;
  updated_at: number;
}

export interface UsageRecord {
  id: string;
  user_id: string | null;
  ip_address: string | null;
  date: string;
  count: number;
  created_at: number;
}

export interface NameHistory {
  id: string;
  user_id: string;
  original_name: string | null;
  gender: string | null;
  birthday: string | null;
  generated_names: string; // JSON
  created_at: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  chinese_name: string;
  pinyin: string | null;
  meaning: string | null;
  style: string | null;
  created_at: number;
}

// Usage limits
export const USAGE_LIMITS = {
  anonymous: 3,
  free: 10,
  pro: 50,
} as const;

export const HISTORY_LIMITS = {
  free: 30, // days
  pro: 365, // days
} as const;

export const FAVORITE_LIMITS = {
  free: 5,
  pro: 50,
} as const;
