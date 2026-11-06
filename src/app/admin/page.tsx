import { Col, Container, Row } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ContactCardAdmin from '@/components/ContactCardAdmin';

const AdminPage = async () => {
  const session = await auth();
  adminProtectedPage(session as { user: { email: string; id: string; name: string; role?: string } } | null);
  const contacts = await prisma.contact.findMany({ orderBy: { id: 'asc' } });

  return (
    <main className="flex-grow-1">
      <Container id="admin" fluid className="px-4 px-md-5 py-2">
        <h2 className="text-center mb-4">List Contacts (Admin)</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCardAdmin contact={contact} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
