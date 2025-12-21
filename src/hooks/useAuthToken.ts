
// hooks/useAuthToken.ts
import { signOut, useSession } from "next-auth/react"
import { useCallback, useRef } from "react"

export function useAuthToken() {
  const { data: session, update } = useSession() 
  const sessionRef = useRef(session)

  // Mantener una referencia actualizada de la sesión
  sessionRef.current = session

  const refreshToken = async (): Promise<string | null> => {
    try {
      if (!sessionRef.current?.refreshToken) {
        console.error('No hay refresh token disponible')
        return null
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: sessionRef.current.refreshToken,
        }),
      })

      if (response.ok) {
        const newTokens = await response.json()
        
        // Actualizar la sesión con los nuevos tokens
        await update({
            ...sessionRef.current,
          accessToken: newTokens.access,
          refreshToken: newTokens.refresh || sessionRef.current.refreshToken,
        })
    
        return newTokens.access
      } else {
        console.error('Error refrescando token:', response.status)
        // Si el refresh token también expiró, cerrar sesión
        await signOut({ redirect: true, callbackUrl: '/login' })
        return  null
      }
    } catch (error) {
      console.error('Error en refreshToken:', error)
      await signOut({ redirect: true, callbackUrl: '/login' })
      return null
    }
  }

  const getAuthHeader = useCallback((customToken?: string) => {
    const token = customToken || sessionRef.current?.accessToken
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return {}
  }, [])

  const fetchApi = async (url: string, options: RequestInit = {}): Promise<Response> => {
    
    try {
        // Si el body es FormData, no establecer Content-Type (el navegador lo hará automáticamente)
        const isFormData = options.body instanceof FormData
        const authHeaders = getAuthHeader()
        
        // Si es FormData, eliminar Content-Type del header de autenticación
        let finalAuthHeaders = authHeaders
        if (isFormData && authHeaders['Content-Type']) {
          const { 'Content-Type': _, ...headersWithoutContentType } = authHeaders
          finalAuthHeaders = headersWithoutContentType
        }

        const headers = {
        ...finalAuthHeaders,
        ...options.headers,
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
        ...options,
        headers: Object.fromEntries(
            Object.entries(headers).filter(([_, v]) => v !== undefined)
        ),
        })

        if (response.status === 401) {
            const newAccessToken = await refreshToken()
            
            if (newAccessToken) {
                
                // Reintentar con el nuevo token
                const retryAuthHeaders = getAuthHeader(newAccessToken)
                
                // Si es FormData, eliminar Content-Type del header de autenticación
                let finalRetryHeaders = retryAuthHeaders
                if (isFormData && retryAuthHeaders['Content-Type']) {
                  const { 'Content-Type': _, ...headersWithoutContentType } = retryAuthHeaders
                  finalRetryHeaders = headersWithoutContentType
                }
                
                const newHeaders = {
                    ...finalRetryHeaders,
                    ...options.headers,
                }

                return fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`, {
                    ...options,
                    headers: Object.fromEntries(
                    Object.entries(newHeaders).filter(([_, v]) => v !== undefined)
                    ),
                })
            
            
            
            } 
        }
        
        return response
      
    } catch (error) {
      console.error('Error en fetchApi:', error)
      throw error
    }

  }

  return {
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    getAuthgetAuthHeader: () => getAuthHeader(),
    fetchApi,
    isAuthenticated: !!session?.accessToken,
  }
}