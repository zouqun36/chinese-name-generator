/**
 * D1 Database helper
 * In Cloudflare Pages, DB is injected via wrangler binding.
 * Access via getRequestContext() from @cloudflare/next-on-pages.
 */

import { getOptionalRequestContext } from '@cloudflare/next-on-pages';

export function getDB(): D1Database | null {
  // Try next-on-pages request context first (correct way in edge runtime)
  try {
    const ctx = getOptionalRequestContext();
    const env = ctx?.env as any;
    if (env?.DB) return env.DB as D1Database;
  } catch {}

  // Fallback: globalThis injection (works in some setups)
  const g = globalThis as any;
  if (g.DB) return g.DB as D1Database;
  if (g.__D1_DB__) return g.__D1_DB__ as D1Database;

  return null;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateId(): string {
  return crypto.randomUUID();
}

// ── Users ─────────────────────────────────────────────────────────────────

export async function upsertUser(
  db: D1Database,
  params: {
    email: string;
    name: string | null;
    avatar: string | null;
    googleId: string | null;
  }
): Promise<string> {
  const now = Date.now();
  const id = generateId();

  await db
    .prepare(
      `INSERT INTO users (id, email, name, avatar, google_id, subscription_tier, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'free', ?, ?)
       ON CONFLICT(email) DO UPDATE SET
         name = excluded.name,
         avatar = excluded.avatar,
         google_id = excluded.google_id,
         updated_at = excluded.updated_at`
    )
    .bind(id, params.email, params.name, params.avatar, params.googleId, now, now)
    .run();

  const row = await db
    .prepare('SELECT id FROM users WHERE email = ?')
    .bind(params.email)
    .first<{ id: string }>();

  return row?.id ?? id;
}

export async function getUserByEmail(
  db: D1Database,
  email: string
): Promise<{ id: string; email: string; name: string | null; avatar: string | null; subscription_tier: string; subscription_expires_at: number | null } | null> {
  return db
    .prepare('SELECT id, email, name, avatar, subscription_tier, subscription_expires_at FROM users WHERE email = ?')
    .bind(email)
    .first() ?? null;
}

export async function updateUserSubscription(
  db: D1Database,
  email: string,
  tier: 'free' | 'pro',
  expiresAt: number | null
): Promise<void> {
  await db
    .prepare('UPDATE users SET subscription_tier = ?, subscription_expires_at = ?, updated_at = ? WHERE email = ?')
    .bind(tier, expiresAt, Date.now(), email)
    .run();
}

// ── Usage ──────────────────────────────────────────────────────────────────

export async function getUsageCount(
  db: D1Database,
  key: { userId: string; ip?: never } | { ip: string; userId?: never }
): Promise<number> {
  const today = getTodayString();
  if (key.userId) {
    const row = await db
      .prepare('SELECT count FROM usage_records WHERE user_id = ? AND date = ?')
      .bind(key.userId, today)
      .first<{ count: number }>();
    return row?.count ?? 0;
  } else {
    // Anonymous IP-based usage — stored with user_id = 'ip:xxx'
    const row = await db
      .prepare('SELECT count FROM usage_records WHERE user_id = ? AND date = ?')
      .bind(`ip:${key.ip}`, today)
      .first<{ count: number }>();
    return row?.count ?? 0;
  }
}

export async function incrementUsage(
  db: D1Database,
  key: { userId: string; ip?: never } | { ip: string; userId?: never }
): Promise<number> {
  const today = getTodayString();
  const id = key.userId ?? `ip:${key.ip}`;
  await db
    .prepare(
      `INSERT INTO usage_records (id, user_id, date, count, updated_at)
       VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(user_id, date) DO UPDATE SET
         count = count + 1,
         updated_at = excluded.updated_at`
    )
    .bind(generateId(), id, today, Date.now())
    .run();

  const row = await db
    .prepare('SELECT count FROM usage_records WHERE user_id = ? AND date = ?')
    .bind(id, today)
    .first<{ count: number }>();
  return row?.count ?? 1;
}

// Legacy alias
export async function getUsageToday(db: D1Database, userId: string): Promise<number> {
  return getUsageCount(db, { userId });
}

// ── History ────────────────────────────────────────────────────────────────

export async function addHistory(
  db: D1Database,
  params: {
    userId: string;
    originalName: string;
    gender: string;
    birthday: string;
    generatedNames: object; // JSON serializable
  }
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO name_history (id, user_id, original_name, gender, birthday, generated_names, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      generateId(),
      params.userId,
      params.originalName,
      params.gender,
      params.birthday,
      JSON.stringify(params.generatedNames),
      Date.now()
    )
    .run();
}

export async function getHistory(
  db: D1Database,
  userId: string,
  limit = 50
): Promise<Array<{ id: string; original_name: string; gender: string; birthday: string; generated_names: string; created_at: number }>> {
  const result = await db
    .prepare('SELECT id, original_name, gender, birthday, generated_names, created_at FROM name_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?')
    .bind(userId, limit)
    .all<{ id: string; original_name: string; gender: string; birthday: string; generated_names: string; created_at: number }>();
  return result.results;
}

// ── Favorites ──────────────────────────────────────────────────────────────

export async function addFavorite(
  db: D1Database,
  params: {
    userId: string;
    chineseName: string;
    pinyin: string;
    meaning: string;
    style: string;
  }
): Promise<void> {
  await db
    .prepare(
      `INSERT OR IGNORE INTO favorites (id, user_id, chinese_name, pinyin, meaning, style, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      generateId(),
      params.userId,
      params.chineseName,
      params.pinyin,
      params.meaning,
      params.style,
      Date.now()
    )
    .run();
}

export async function removeFavorite(
  db: D1Database,
  userId: string,
  chineseName: string
): Promise<void> {
  await db
    .prepare('DELETE FROM favorites WHERE user_id = ? AND chinese_name = ?')
    .bind(userId, chineseName)
    .run();
}

export async function getFavorites(
  db: D1Database,
  userId: string
): Promise<Array<{ id: string; chinese_name: string; pinyin: string; meaning: string; style: string; created_at: number }>> {
  const result = await db
    .prepare('SELECT id, chinese_name, pinyin, meaning, style, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC')
    .bind(userId)
    .all<{ id: string; chinese_name: string; pinyin: string; meaning: string; style: string; created_at: number }>();
  return result.results;
}

export async function getFavoriteCount(
  db: D1Database,
  userId: string
): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) as cnt FROM favorites WHERE user_id = ?')
    .bind(userId)
    .first<{ cnt: number }>();
  return row?.cnt ?? 0;
}
