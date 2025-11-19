import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  await prisma.user.update({
    where: { email },
    data: { isVerified: true }
  });
  res.status(200).json({ message: 'User verified' });
}
