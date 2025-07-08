import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  hashSync;

  await prisma.user.upsert({
    where: { id: 1 },
    update: {
      name: 'Admin',
      email: 'admin@email.com',
      password: hashSync('12345'),
      role: 'admin',
    },
    create: {
      name: 'Admin',
      email: 'admin@email.com',
      password: hashSync('12345'),
      role: 'admin',
    },
  });

  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      label: 'Energia',
    },
  });

  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      label: 'Aluguél',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
