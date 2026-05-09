import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { supabaseAuth } from '@/app/libs/supabase';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        isSignup: { label: 'Signup', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Signup flow
        if (credentials.isSignup === 'true' && credentials.name) {
          const supabaseUser = await supabaseAuth.signUp(credentials.email, credentials.password, credentials.name).catch(() => null);
          const existing = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (existing) {
            await prisma.user.update({
              where: { email: credentials.email },
              data: { name: credentials.name, hashedPassword: await bcrypt.hash(credentials.password, 12) }
            });
          } else {
            await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.name,
                hashedPassword: await bcrypt.hash(credentials.password, 12),
                image: null,
                isVerified: false,
              }
            });
          }
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          return user ? { id: user.id, name: user.name ?? 'User', email: user.email! } : null;
        }

        // Login flow
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user?.hashedPassword) return null;
        const valid = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!valid) {
          // Try Supabase login as fallback
          try {
            const supabaseSession = await supabaseAuth.signIn(credentials.email, credentials.password);
            if (supabaseSession?.access_token) {
              return { id: user?.id || supabaseSession.user?.id || 'new', name: user?.name ?? credentials.email.split('@')[0], email: credentials.email };
            }
          } catch {}
          return null;
        }
        return { id: user.id, name: user.name ?? 'User', email: user.email! };
      }
    })
  ],
  pages: { signIn: '/signin' },
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (dbUser) {
          (session.user as any).id = dbUser.id;
          (session.user as any).isAdmin = dbUser.isAdmin;
          (session.user as any).isVerified = dbUser.isVerified;
          (session.user as any).image = dbUser.image ?? session.user.image ?? null;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
