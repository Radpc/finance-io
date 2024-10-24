import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
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
