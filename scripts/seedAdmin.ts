import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@messenger.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      hashedPassword,
      isAdmin: true,
      isVerified: true,
      coverPhoto: '/default-cover.jpg',
      image: '/default-cover.jpg'
    }
  });

  console.log('Admin seeded:', email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
