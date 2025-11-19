import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { id, value } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });
  await prisma.user.update({
    where: { id },
    data: { isVerified: !!value }
  });
  res.status(200).json({ message: 'Updated' });
}
