import { notFound } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditContactForm from '@/components/EditContactForm';

export default async function EditContactPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  loggedInProtectedPage(
    session as { user: { email: string; id: string; name: string } } | null,
  );

  const { id } = await params;
  const contactID = Number(id);
  if (!Number.isSafeInteger(contactID) || contactID < 1) {
    notFound();
  }

  const contact = await prisma.contact.findFirst({
    where: {
      id: contactID,
      owner: session?.user?.email ?? '',
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <main className="flex-grow-1">
      <EditContactForm contact={contact} />
    </main>
  );
}
