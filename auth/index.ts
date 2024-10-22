import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { getUserForAuth, getUserForEmail } from "@/server/users"
import { validatePassword } from "@/server/helpers"

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        client: string
      } & DefaultSession["user"]
    }

}

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
                client: {}
            },
            authorize: async (credentials) => {
                //Get user info from DB with email
                const dbUser = await getUserForAuth(credentials.email as string)
                
                if (!dbUser) {
                    throw new Error("No user account found for this email")
                }

                if (credentials.client as string !== dbUser.client) {
                    throw new Error("Client specified does not match user account")
                }
                
                // logic to salt and hash password
                const passwordCorrect = validatePassword(credentials.password as string, dbUser?.password!)
                
                if (!passwordCorrect) {
                    throw new Error("Incorrect password")
                }
        
                // return user object with their profile data
                return {
                    id: dbUser.id,
                    client: dbUser.client,
                    email: dbUser.email,
                    name: dbUser.name,
                    image: dbUser.image,
                }
            },
            
        }),
    ],
    callbacks: {
        jwt: ({ user, token }) => {
            return {
                ...token,
                client: (user as any).client,
            }
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                    client: (token as any).client,
                }
            }
        }
    },
    session: {
        strategy: "jwt"
    }
})