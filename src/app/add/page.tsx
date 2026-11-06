import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import AddContactForm from '@/components/AddContactForm';

const AddContactPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as { user: { email: string; id: string; name: string } } | null,
  );

  return (
    <main className="flex-grow-1">
      <AddContactForm />
    </main>
  );
};

export default AddContactPage;
