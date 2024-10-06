import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: "Login", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your Express backend API to verify login credentials
        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            login: credentials.login,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Return user data to be attached to session
        } else {
          return null; // Return null to indicate failed login
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Include user role in JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Custom login page
  },
});

export { handler as GET, handler as POST };
