import Credentials from "next-auth/providers/credentials"
import type { NextAuthOptions } from 'next-auth'
import NextAuth from "next-auth"



/**
 * Refresca el access token usando el refresh token
 */


async function refreshAccessToken(token: any) {
    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: token.refreshToken,
                }),
            }
        )

        const responseData = await response.json()

        if (!response.ok) {
            throw responseData.detail
        }

        return {
            ...token,
            accessToken: responseData.data.access,
            refreshToken: responseData.data.refresh,
            accessTokenExpires: Date.now() + 2 * 60 * 1000, // 60 minutos
        }
    } catch (error) {
        console.error('❌ Error refrescando access token:', error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}
export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                })
                const jsonResponse = await response.json()
                const data = jsonResponse.data

                return {
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.full_name,
                    role: data.user.role,
                    image: data.user.image,
                    organizationId:data.user.organization.id,
                    accessToken: data.access,      // ← Del nivel superior de data
                    refreshToken: data.refresh,    // ← Del nivel superior de data
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.username = (user as any).username
                token.email = user.email;
                token.organizationId = (user as any).organizationId
                token.accessToken = (user as any).accessToken;
                token.refreshToken = (user as any).refreshToken;
                token.role = (user as any).role;
                token.image = (user as any).image;
                token.accessTokenExpires = Date.now() + 2 * 60 * 1000; // 60 minutos
            }

            // Si se solicita actualizar la sesión (desde el frontend)
            if (trigger === "update" && session) {
                token.accessToken = session.accessToken
                token.refreshToken = session.refreshToken
                token.accessTokenExpires = Date.now() + 2 * 60 * 1000
            }

            // Verificar si el token está próximo a expirar
            const now = Date.now()
            const timeUntilExpiry = (token.accessTokenExpires as number) - now
            const minutesUntilExpiry = Math.floor(timeUntilExpiry / 1000 / 60)

            // 🔑 CLAVE: Refrescar preventivamente cuando falten menos de 5 minutos
            if (timeUntilExpiry < 1 * 60 * 1000) {
                return refreshAccessToken(token)
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.username as string;
                session.user.email = token.email as string;
                session.user.image = token.image as string;
                session.user.role = token.role as string;
                (session as any).organizationId = token.organizationId as string;
                // Add accessToken and refreshToken to the session object (not user object) with type safety
                (session as any).accessToken = token.accessToken as string;
                (session as any).refreshToken = token.refreshToken as string;
               
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },

    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 horas
    },

    jwt: {
        maxAge: 60 * 60, // 60 minutos
    },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authOptions,
})