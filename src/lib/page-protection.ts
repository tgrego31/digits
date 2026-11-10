import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';


export const loggedInProtectedPage = (session: { user: { email: string; id: string; name: string } } | null) => {
  if (!session) {
    redirect('/auth/signin');
  }
};


export const adminProtectedPage = (session: { user: { email: string; id: string; name: string; role?: string } } | null) => {
  loggedInProtectedPage(session);
  if (session && session.user.role !== Role.ADMIN) {
    redirect('/not-authorized');
  }
};
