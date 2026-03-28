export const runtime = 'edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileClient from '@/components/ProfileClient';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  // Our custom session cookie (set by lib/auth-edge.ts)
  const sessionToken = cookieStore.get('auth_session')?.value;
  if (!sessionToken) {
    redirect('/login');
  }
  return <ProfileClient />;
}
