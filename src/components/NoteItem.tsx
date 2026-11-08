'use client';

import type { Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

const NoteItem = ({ note }: { note: Note }) => (
  <ListGroup.Item>
    <p className="fw-lighter text-muted mb-2">{new Date(note.createdAt).toLocaleDateString('en-US')}</p>
    <p className="mb-0">{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;
