import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { followerId, followingId } = req.body;
  if (!followerId || !followingId) return res.status(400).json({ error: 'Missing ids' });
  if (followerId === followingId) return res.status(400).json({ error: 'Cannot follow yourself' });

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } }
  }).catch(() => null);

  if (existing) {
    await prisma.follow.delete({ where: { followerId_followingId: { followerId, followingId } } });
    return res.status(200).json({ following: false });
  } else {
    await prisma.follow.create({ data: { followerId, followingId } });
    return res.status(200).json({ following: true });
  }
}
