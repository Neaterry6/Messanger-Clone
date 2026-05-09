const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const headers = {
  apikey: supabaseAnonKey,
  'Content-Type': 'application/json',
};

export const supabaseAuth = {
  async signUp(email: string, password: string, name: string) {
    const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password, data: { full_name: name } }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error_description || err?.msg || 'Signup failed');
    }
    return res.json();
  },

  async signIn(email: string, password: string) {
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error_description || err?.msg || 'Login failed');
    }
    return res.json();
  },

  async getUser(token: string) {
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  },

  async signOut(token: string) {
    await fetch(`${supabaseUrl}/auth/v1/logout`, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${token}` },
    });
  },
};
