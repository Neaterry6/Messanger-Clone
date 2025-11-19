'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Feed() {
  const { data: session } = useSession();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: '#111', color: '#fff', padding: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Messenger Clone</div>
          <div style={{ color: '#aaa', marginTop: 6 }}>
            {session?.user?.name ?? 'Guest'} {session?.user?.isVerified ? '✅' : ''}
          </div>
        </div>
        <nav style={{ display: 'grid', gap: 8 }}>
          <Link href="/feed">Home</Link>
          <Link href={`/profile/${session?.user?.id ?? ''}`}>Profile</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/signin">Sign in</Link>
        </nav>
      </aside>
      <main style={{ padding: 24, background: '#f7f7f7' }}>
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Feed</h1>
          <Link href="/profile">Go to my profile</Link>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: 12 }}>
            <input placeholder="What's on your mind?" style={{ width: '100%', padding: 10 }} />
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button>Post</button>
              <button>Attach</button>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>Chloe Roberts {true ? '✅' : ''}</div>
            <div style={{ color: '#666', fontSize: 12 }}>2 hours ago</div>
            <p style={{ marginTop: 8 }}>Just had the most amazing day!</p>
            <img src="/default-cover.jpg" alt="" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 8 }} />
          </div>
        </div>
        <div style={{ color: '#888', textAlign: 'center', marginTop: 24 }}>End of Feed.</div>
      </main>
    </div>
  );
}
