import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@messenger.com',
      password: hashedPassword,
      isAdmin: true,
      isVerified: true,
    },
  });
}

main().catch(console.error);
