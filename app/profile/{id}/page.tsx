import { PrismaClient } from '@prisma/client';
import ProfileCard from '../../components/ProfileCard';

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      followers: true,
      following: true
    }
  });

  if (!user) {
    return <div style={{ padding: 24 }}>User not found</div>;
  }

  const followers = await prisma.follow.findMany({
    where: { followingId: user.id },
    include: { follower: true }
  });

  const following = await prisma.follow.findMany({
    where: { followerId: user.id },
    include: { following: true }
  });

  return (
    <div style={{ padding: 24 }}>
      <ProfileCard
        id={user.id}
        name={user.name ?? 'User'}
        email={user.email ?? ''}
        coverPhoto={user.coverPhoto ?? '/default-cover.jpg'}
        isVerified={user.isVerified}
        followersCount={followers.length}
        followingCount={following.length}
        followers={followers.map(f => f.follower)}
        following={following.map(f => f.following)}
      />
    </div>
  );
}
