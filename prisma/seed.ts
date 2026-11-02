import 'dotenv/config';
import { Condition, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from '../src/lib/prisma';
import config from '../config/settings.development.json';

async function main() {
  const password = await hash('changeme', 10);
  for (const account of config.defaultAccounts) {
    const role = account.role === 'ADMIN' ? Role.ADMIN : Role.USER;
    await prisma.user.upsert({
      where: { email: account.email },
      update: { password, role },
      create: { email: account.email, password, role },
    });
  }

  for (const [index, data] of config.defaultData.entries()) {
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition: data.condition as Condition,
      },
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
