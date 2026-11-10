'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AddContactSchema, AddNoteSchema, EditContactSchema } from '@/lib/validationSchemas';
import { prisma } from './prisma';

export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  const session = await auth();
  const owner = session?.user?.email;
  if (!owner) {
    redirect('/auth/signin');
  }

  const data = await AddContactSchema.validate(contact, { abortEarly: false, stripUnknown: true });
  await prisma.contact.create({ data: { ...data, owner } });
  redirect('/list');
}

export async function editContact(contact: {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  const session = await auth();
  const owner = session?.user?.email;
  if (!owner) {
    redirect('/auth/signin');
  }

  const data = await EditContactSchema.validate(contact, { abortEarly: false, stripUnknown: true });
  const result = await prisma.contact.updateMany({
    where: { id: data.id, owner },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      image: data.image,
      description: data.description,
    },
  });

  if (result.count === 0) {
    throw new Error('Contact not found or not authorized');
  }

  redirect('/list');
}

export async function addNote(values: { note: string; contactId: number; owner: string }) {
  const session = await auth();
  const owner = session?.user?.email;
  if (!owner) {
    redirect('/auth/signin');
  }

  const data = await AddNoteSchema.validate(values, { abortEarly: false, stripUnknown: true });
  const contact = await prisma.contact.findFirst({ where: { id: data.contactId, owner }, select: { id: true } });
  if (!contact) {
    throw new Error('Contact not found or not authorized');
  }

  await prisma.note.create({
    data: {
      note: data.note,
      contactId: contact.id,
      owner,
    },
  });
  redirect('/list');
}
