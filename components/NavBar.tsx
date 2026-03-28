'use client';

import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

interface NavBarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function NavBar({ user }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between py-2">
      <div className="text-lg">🀄</div>

      <div className="flex items-center gap-3">
        <Link
          href="/pricing"
          className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          Pricing
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2 group">
              {user.image ? (
                <img
                  src={user.image}
                  alt="avatar"
                  className="w-7 h-7 rounded-full ring-2 ring-transparent group-hover:ring-amber-400 transition-all"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.[0] ?? '?'}
                </div>
              )}
              <span className="text-xs text-zinc-600 group-hover:text-zinc-900 hidden sm:block">
                {user.name?.split(' ')[0]}
              </span>
            </Link>
            <button
              onClick={() => signOut()}
              className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="text-xs bg-gradient-to-r from-red-500 to-amber-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
