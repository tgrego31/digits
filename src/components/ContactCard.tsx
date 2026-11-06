'use client';

import { Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact } from '@prisma/client';

type ContactCardProps = {
  contact: Contact;
};

const ContactCard = ({ contact }: ContactCardProps) => (
  <Card className="h-100 contact-card">
    <Card.Header>
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={64}
        height={64}
        className="contact-photo"
      />
      <Card.Title className="mt-1 mb-0">
        {contact.firstName} {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-0">{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
