import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'email', type: 'text' },
          password: { label: 'password', type: 'password' },
          name: { label: 'name', type: 'text' },
          isSignup: { label: 'isSignup', type: 'text' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) throw new Error('Invalid credentials');

          if (credentials.isSignup === 'true' && credentials.name) {
            const existing = await prisma.user.findUnique({ where: { email: credentials.email } });
            if (!existing) {
              await prisma.user.create({
                data: {
                  email: credentials.email,
                  name: credentials.name,
                  hashedPassword: await bcrypt.hash(credentials.password, 12),
                }
              });
            }
            const user = await prisma.user.findUnique({ where: { email: credentials.email } });
            if (!user) throw new Error('Failed to create user');
            return user;
          }

          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (!user || !user?.hashedPassword) throw new Error('Invalid credentials');

          const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
          if (!isCorrectPassword) throw new Error('Invalid credentials');

          return user;
        }
      })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
  }
