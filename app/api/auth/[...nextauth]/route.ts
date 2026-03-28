import { NextRequest, NextResponse } from 'next/server';
import { signJWT, verifyJWT, createSessionCookie, clearSessionCookie, getSession } from '@/lib/auth-edge';
import { getDB, upsertUser } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

function getSecret(): string {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? '';
}

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get('host') ?? 'chinanam.online';
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest, context: any) {
  try {
    const action: string[] = context?.params?.nextauth ?? [];
    const baseUrl = getBaseUrl(req);
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? '';
    const SECRET = getSecret();
    const callbackUrl = `${baseUrl}/api/auth/callback/google`;

    // /api/auth/providers
    if (action[0] === 'providers') {
      return NextResponse.json({
        google: {
          id: 'google',
          name: 'Google',
          type: 'oauth',
          signinUrl: `${baseUrl}/api/auth/signin/google`,
          callbackUrl,
        },
      });
    }

    // /api/auth/session
    if (action[0] === 'session') {
      const session = await getSession(req as unknown as Request);
      if (!session) return NextResponse.json({ user: null, expires: null });
      const exp = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      return NextResponse.json({ user: session, expires: exp });
    }

    // /api/auth/csrf — stub
    if (action[0] === 'csrf') {
      return NextResponse.json({ csrfToken: crypto.randomUUID() });
    }

    // /api/auth/signin or /api/auth/signin/google
    if (action[0] === 'signin') {
      if (!GOOGLE_CLIENT_ID) {
        return new NextResponse('Server misconfiguration: missing GOOGLE_CLIENT_ID', { status: 500 });
      }
      const redirectBack = req.nextUrl.searchParams.get('callbackUrl') ?? '/';
      const state = await signJWT({ callbackUrl: redirectBack, nonce: crypto.randomUUID() }, SECRET);
      const googleUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      googleUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
      googleUrl.searchParams.set('redirect_uri', callbackUrl);
      googleUrl.searchParams.set('response_type', 'code');
      googleUrl.searchParams.set('scope', 'openid email profile');
      googleUrl.searchParams.set('state', state);
      googleUrl.searchParams.set('prompt', 'select_account');
      return NextResponse.redirect(googleUrl.toString());
    }

    // /api/auth/callback/google
    if (action[0] === 'callback' && action[1] === 'google') {
      const code = req.nextUrl.searchParams.get('code');
      const state = req.nextUrl.searchParams.get('state');

      if (!code) return NextResponse.redirect(`${baseUrl}/?error=no_code`);

      // Verify state (optional - don't fail hard if missing)
      let redirectTo = '/';
      try {
        if (state && SECRET) {
          const stateData = await verifyJWT<{ callbackUrl: string }>(state, SECRET);
          if (stateData?.callbackUrl) redirectTo = stateData.callbackUrl;
        }
      } catch {
        // state verification failed, use default redirect
      }

      // Exchange code for tokens
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: callbackUrl,
          grant_type: 'authorization_code',
        }),
      });

      const tokens = await tokenRes.json() as any;
      if (!tokens.access_token) {
        return NextResponse.redirect(`${baseUrl}/?error=token_failed&detail=${encodeURIComponent(tokens.error ?? 'unknown')}`);
      }

      // Get user info
      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      const googleUser = await userRes.json() as any;

      if (!googleUser.email) {
        return NextResponse.redirect(`${baseUrl}/?error=no_email`);
      }

      // Upsert to D1 (non-fatal)
      try {
        const db = getDB();
        if (db) {
          await upsertUser(db, {
            email: googleUser.email,
            name: googleUser.name ?? null,
            avatar: googleUser.picture ?? null,
            googleId: googleUser.id ?? null,
          });
        }
      } catch (err) {
        // D1 error is non-fatal — user still gets logged in
        console.error('D1 upsert error (non-fatal):', err);
      }

      const user = {
        id: googleUser.id ?? googleUser.email,
        email: googleUser.email,
        name: googleUser.name ?? null,
        image: googleUser.picture ?? null,
      };

      const cookie = await createSessionCookie(user, SECRET);
      const response = NextResponse.redirect(`${baseUrl}${redirectTo}`);
      response.headers.set('Set-Cookie', cookie);
      return response;
    }

    // /api/auth/signout
    if (action[0] === 'signout') {
      const response = NextResponse.redirect(`${baseUrl}/`);
      response.headers.set('Set-Cookie', clearSessionCookie());
      return response;
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 404 });

  } catch (err: any) {
    console.error('[auth GET error]', err);
    return new NextResponse(`Auth error: ${err?.message ?? 'unknown'}`, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: any) {
  try {
    const action: string[] = context?.params?.nextauth ?? [];
    const baseUrl = getBaseUrl(req);
    const SECRET = getSecret();
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';

    if (action[0] === 'signout') {
      const response = NextResponse.redirect(`${baseUrl}/`);
      response.headers.set('Set-Cookie', clearSessionCookie());
      return response;
    }

    if (action[0] === 'signin') {
      const body = await req.text();
      const formParams = new URLSearchParams(body);
      const redirectBack = formParams.get('callbackUrl') ?? '/';
      const callbackUri = `${baseUrl}/api/auth/callback/google`;
      const state = await signJWT({ callbackUrl: redirectBack, nonce: crypto.randomUUID() }, SECRET);
      const googleUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      googleUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
      googleUrl.searchParams.set('redirect_uri', callbackUri);
      googleUrl.searchParams.set('response_type', 'code');
      googleUrl.searchParams.set('scope', 'openid email profile');
      googleUrl.searchParams.set('state', state);
      googleUrl.searchParams.set('prompt', 'select_account');
      return NextResponse.json({ url: googleUrl.toString() });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 404 });

  } catch (err: any) {
    console.error('[auth POST error]', err);
    return new NextResponse(`Auth error: ${err?.message ?? 'unknown'}`, { status: 500 });
  }
}
