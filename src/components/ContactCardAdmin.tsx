'use client';

import type { Contact, Note } from '@prisma/client';
import { Card, Image, ListGroup } from 'react-bootstrap';
import NoteItem from '@/components/NoteItem';

type ContactCardAdminProps = {
  contact: Contact;
  notes: Note[];
};

const ContactCardAdmin = ({ contact, notes }: ContactCardAdminProps) => (
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
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
      <p className="blockquote-footer mt-3 mb-0">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
