export const runtime = 'edge';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ProfileClient from '@/components/ProfileClient';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <ProfileClient user={session.user} />;
}
