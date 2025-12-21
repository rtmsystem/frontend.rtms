import { Session } from "next-auth"
import { signOut, useSession } from "next-auth/react"

// utils/refreshToken.ts
const refreshToken = async (): Promise<boolean> => {

    const { data: session, update } = useSession()

    try {
      if (!session?.refreshToken) {
        console.error('No hay refresh token disponible')
        return false
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: session.refreshToken,
        }),
      })

      if (response.ok) {
        const newTokens = await response.json()
        
        // Actualizar la sesión con los nuevos tokens
        await update({
          ...session,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken || session.refreshToken,
        })
        
        return true
      } else {
        console.error('Error refrescando token:', response.status)
        // Si el refresh token también expiró, cerrar sesión
        await signOut({ redirect: true, callbackUrl: '/auth/signin' })
        return false
      }
    } catch (error) {
      console.error('Error en refreshToken:', error)
      await signOut({ redirect: true, callbackUrl: '/auth/signin' })
      return false
    }
  }     

export default refreshToken