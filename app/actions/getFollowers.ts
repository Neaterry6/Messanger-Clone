import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getFollowers(userId: string) {
  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: { follower: true }
  });
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: { following: true }
  });
  return { followers, following };
}
