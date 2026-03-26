
import NextAuth, { type AuthOptions, type SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@/app/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Identifiant",
      credentials: {
        identifiant: { label: "Identifiant", type: "text", placeholder: "Votre identifiant" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.identifiant || !credentials?.password) return null;
        const users = await sql`
          SELECT * FROM users WHERE identifiant = ${credentials.identifiant} AND password = ${credentials.password}
        `;
        if (users.length === 1) {
          return { id: users[0].id, name: users[0].identifiant };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" as SessionStrategy },
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
