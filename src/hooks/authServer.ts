import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authOptions } from "@/libs/auth"
// import { getServerSession } from "next-auth"
import { getServerSession } from "next-auth/next"

export async function getServerAuthToken() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return null
  }

  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    isAuthenticated: !!session.accessToken,
  }
}

export async function getServerAuthHeader() {

  const token = await getServerAuthToken()
  
  
  if (token?.accessToken) {
    return {
      'Authorization': `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json'
    }
  }
  
  return {}
}

export async function serverFetchApi(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = await getServerAuthHeader()
 
  const response = await fetch(url, {
    ...options,
    headers: Object.fromEntries(
        Object.entries(headers).filter(([_, v]) => v !== undefined)
    ),
    cache: options.cache || 'no-store',
    })

  // Para el refresh token en servidor, necesitarías una estrategia diferente
  if (response.status === 401) {

    // En servidor, normalmente rediriges o manejas de otra forma
    redirect('/logout')
  }
  
  return  response
}