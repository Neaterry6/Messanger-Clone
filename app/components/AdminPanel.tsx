'use client';
import { useEffect, useState } from 'react';

type UserLite = { id: string; name?: string | null; email?: string | null; isVerified: boolean };

export default function AdminPanel() {
  const [users, setUsers] = useState<UserLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const verifyByEmail = async () => {
    await fetch('/api/admin/verifyUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    await fetchUsers();
  };

  const toggleVerify = async (id: string, value: boolean) => {
    await fetch('/api/admin/toggleVerify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, value })
    });
    await fetchUsers();
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <div style={{ margin: '12px 0' }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="User email" />
        <button onClick={verifyByEmail}>Verify by email</button>
      </div>
      <h2>Users</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {users.map((u) => (
            <li key={u.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span>{u.name ?? u.email ?? u.id}</span>
              <span>{u.isVerified ? '✅ Verified' : '❌ Not verified'}</span>
              <button onClick={() => toggleVerify(u.id, !u.isVerified)}>
                {u.isVerified ? 'Remove badge' : 'Give badge'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
