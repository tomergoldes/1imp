import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!email || !plainPassword) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required to seed the admin user. ' +
        'Set them in your environment (never commit real credentials).'
    );
  }

  if (plainPassword.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters.');
  }

  const password = await bcrypt.hash(plainPassword, 12);

  const exist = await prisma.user.findUnique({
    where: { email },
  });

  if (!exist) {
    const user = await prisma.user.create({
      data: {
        email,
        name: process.env.ADMIN_NAME || 'Admin',
        password,
        isAdmin: true,
        credits: 100,
      },
    });
    console.log('Admin user created successfully:', user.email);
  } else {
    // Only promote to admin. Do NOT silently reset an existing user's password
    // unless explicitly requested via ADMIN_RESET_PASSWORD=true.
    const shouldResetPassword = process.env.ADMIN_RESET_PASSWORD === 'true';
    const user = await prisma.user.update({
      where: { email },
      data: {
        isAdmin: true,
        ...(shouldResetPassword ? { password } : {}),
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
