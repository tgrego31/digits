import 'dotenv/config';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from '../src/lib/prisma';
import config from '../config/settings.development.json';

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  for (const account of config.defaultAccounts) {
    const role = account.role === 'ADMIN' ? Role.ADMIN : Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: { password, role },
      create: { email: account.email, password, role },
    });
  }


  for (const [index, contact] of config.defaultContacts.entries()) {
    console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
    await prisma.contact.upsert({
      where: { id: index + 1 },
      update: contact,
      create: contact,
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
