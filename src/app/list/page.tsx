import { Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const ListPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as { user: { email: string; id: string; name: string } } | null,
  );

  return (
    <main className="flex-grow-1">
      <Container id="list" fluid className="px-4 px-md-5 py-2">
        <h2 className="text-center mb-4">Contacts</h2>
        <Row xs={1} md={2} lg={3} className="g-4" />
      </Container>
    </main>
  );
};

export default ListPage;
