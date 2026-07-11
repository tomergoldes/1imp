import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'tomergoldes@gmail.com';
  const password = await bcrypt.hash('7568855Tg', 10);

  const exist = await prisma.user.findUnique({
    where: { email },
  });

  if (!exist) {
    const user = await prisma.user.create({
      data: {
        email,
        name: 'Tomer Goldes',
        password,
        isAdmin: true,
        credits: 100, // Give admin some credits to play with
      },
    });
    console.log('Admin user created successfully:', user.email);
  } else {
    const user = await prisma.user.update({
      where: { email },
      data: {
        isAdmin: true,
        password, // Update password just in case
      },
    });
    console.log('Admin user updated successfully:', user.email);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
