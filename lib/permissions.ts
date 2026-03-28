import { User, USAGE_LIMITS, HISTORY_LIMITS, FAVORITE_LIMITS } from './types';

export function canGenerate(user: User | null, usageCount: number): boolean {
  if (!user) return usageCount < USAGE_LIMITS.anonymous;
  if (user.subscription_tier === 'pro' && isSubscriptionActive(user)) {
    return usageCount < USAGE_LIMITS.pro;
  }
  return usageCount < USAGE_LIMITS.free;
}

export function isSubscriptionActive(user: User): boolean {
  if (user.subscription_tier !== 'pro') return false;
  if (!user.subscription_expires_at) return false;
  return user.subscription_expires_at > Date.now();
}

export function getHistoryLimit(user: User | null): number {
  if (!user) return 0;
  if (user.subscription_tier === 'pro' && isSubscriptionActive(user)) {
    return HISTORY_LIMITS.pro;
  }
  return HISTORY_LIMITS.free;
}

export function getFavoriteLimit(user: User | null): number {
  if (!user) return 0;
  if (user.subscription_tier === 'pro' && isSubscriptionActive(user)) {
    return FAVORITE_LIMITS.pro;
  }
  return FAVORITE_LIMITS.free;
}

export function getUserTier(user: User | null): 'anonymous' | 'free' | 'pro' {
  if (!user) return 'anonymous';
  if (user.subscription_tier === 'pro' && isSubscriptionActive(user)) {
    return 'pro';
  }
  return 'free';
}
