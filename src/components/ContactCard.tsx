'use client';

import type { Contact, Note } from '@prisma/client';
import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import AddNoteForm from '@/components/AddNoteForm';
import NoteItem from '@/components/NoteItem';
import contactPhoto from '@/lib/contactPhoto';

type ContactCardProps = {
  contact: Contact;
  notes: Note[];
};

const ContactCard = ({ contact, notes }: ContactCardProps) => (
  <Card className="h-100 contact-card">
    <Card.Header>
      <Image
        src={contactPhoto(contact)}
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
      <AddNoteForm contactId={contact.id} />
    </Card.Body>
    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
