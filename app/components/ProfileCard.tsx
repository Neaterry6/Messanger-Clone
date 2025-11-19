'use client';

type UserLite = { id: string; name?: string | null; email?: string | null; image?: string | null };

export default function ProfileCard(props: {
  id: string;
  name: string;
  email: string;
  coverPhoto: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  followers: UserLite[];
  following: UserLite[];
}) {
  const { id, name, email, coverPhoto, isVerified, followersCount, followingCount, followers, following } = props;

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', id);

    const res = await fetch('/api/profile/uploadCover', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      location.reload();
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <img src={coverPhoto} alt="Cover" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
        <label style={{
          position: 'absolute', right: 12, bottom: 12, background: '#000', color: '#fff',
          padding: '6px 10px', borderRadius: 6, cursor: 'pointer'
        }}>
          Change cover
          <input type="file" style={{ display: 'none' }} onChange={handleCoverUpload} />
        </label>
      </div>
      <div style={{ padding: 16 }}>
        <h2 style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {name} {isVerified && <span style={{ fontSize: 14 }}>✅</span>}
        </h2>
        <p style={{ color: '#666' }}>{email}</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div>
            <strong>Followers:</strong> {followersCount}
          </div>
          <div>
            <strong>Following:</strong> {followingCount}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div>
            <h3>Followers</h3>
            <ul>
              {followers.map((u) => (
                <li key={u.id}>{u.name ?? u.email ?? u.id}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Following</h3>
            <ul>
              {following.map((u) => (
                <li key={u.id}>{u.name ?? u.email ?? u.id}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
