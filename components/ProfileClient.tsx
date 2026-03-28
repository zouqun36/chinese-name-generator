'use client';

import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ProfileClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface UsageData {
  used: number;
  limit: number;
  remaining: number;
  tier: string;
}

interface HistoryItem {
  id: string;
  originalName: string | null;
  gender: string | null;
  generatedNames: string[];
  createdAt: string;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'favorites'>('overview');

  useEffect(() => {
    fetch('/api/usage')
      .then((r) => r.json())
      .then(setUsage)
      .catch(console.error);
  }, []);

  const tierBadge = {
    anonymous: { label: 'Guest', color: 'bg-gray-100 text-gray-600' },
    free: { label: 'Free', color: 'bg-blue-100 text-blue-700' },
    pro: { label: 'Pro ⭐', color: 'bg-amber-100 text-amber-700' },
  };

  const tier = (usage?.tier ?? 'free') as keyof typeof tierBadge;
  const badge = tierBadge[tier];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm flex items-center gap-1">
          ← Back to Generator
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* User Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img src={user.image} alt="avatar" className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.[0] ?? '?'}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name ?? 'User'}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                {badge.label}
              </span>
            </div>
          </div>

          {/* Usage bar */}
          {usage && (
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Today&apos;s generations</span>
                <span className="font-medium text-gray-800">
                  {usage.used} / {usage.limit}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-amber-400 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (usage.used / usage.limit) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{usage.remaining} remaining today</p>
            </div>
          )}

          {tier !== 'pro' && (
            <Link
              href="/pricing"
              className="mt-4 block w-full text-center bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Upgrade to Pro — $2.99/mo →
            </Link>
          )}
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm mb-4 p-1">
          {(['overview', 'history', 'favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Account Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-red-500">{usage?.limit ?? '—'}</p>
                  <p className="text-xs text-gray-500 mt-1">Daily Limit</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-amber-500">
                    {tier === 'pro' ? '50' : '5'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Max Favorites</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-500">
                    {tier === 'pro' ? '365' : '30'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">History Days</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-500">
                    {tier === 'pro' ? '✓' : '✗'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Audio + Export</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-3">📜</div>
              <p className="text-sm">Your name generation history will appear here.</p>
              <p className="text-xs mt-1 text-gray-300">Requires database integration (coming soon)</p>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-3">⭐</div>
              <p className="text-sm">Your saved favorite names will appear here.</p>
              <p className="text-xs mt-1 text-gray-300">Requires database integration (coming soon)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
