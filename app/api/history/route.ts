import { NextRequest, NextResponse } from 'next/server';
import { getEdgeSession as auth } from '@/lib/session';
import { getDB, getUserByEmail, getHistory } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const HISTORY_LIMITS: Record<string, number> = {
  free: 30,
  pro: 200,
};

export async function GET(req: NextRequest) {
  const session = await auth(req);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Login required' }, { status: 401 });
  }

  const db = getDB();
  if (!db) {
    return NextResponse.json({ history: [] });
  }

  const user = await getUserByEmail(db, session.user.email);
  if (!user) return NextResponse.json({ history: [] });

  const tier = user.subscription_tier === 'pro' &&
    user.subscription_expires_at &&
    (user.subscription_expires_at as unknown as number) > Date.now()
    ? 'pro' : 'free';

  const limit = HISTORY_LIMITS[tier] ?? 30;
  const history = await getHistory(db, user.id, limit);

  return NextResponse.json({
    history: history.map((h) => ({
      id: h.id,
      originalName: h.original_name,
      gender: h.gender,
      birthday: h.birthday,
      generatedNames: (() => { try { return JSON.parse(h.generated_names); } catch { return []; } })(),
      createdAt: h.created_at,
    })),
  });
}
