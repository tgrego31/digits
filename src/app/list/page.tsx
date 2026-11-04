import { Col, Container, Row } from 'react-bootstrap';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';

const ListPage = async () => {
  const session = await auth();
  loggedInProtectedPage(session as { user: { email: string; id: string; name: string } } | null);

  const contacts = await prisma.contact.findMany({
    where: { owner: session?.user?.email ?? '' },
    orderBy: { id: 'asc' },
  });

  return (
    <main className="flex-grow-1">
      <Container id="list" fluid className="px-4 px-md-5 py-2">
        <h2 className="text-center mb-4">List Contacts</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCard contact={contact} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
