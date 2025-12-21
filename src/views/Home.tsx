'use client'

import { useAuthToken } from "@/hooks/useAuthToken"
import { signOut } from "@/libs/auth"
import { useEffect, useState } from "react"


const HomeView = () => {
    const { fetchApi, isAuthenticated } = useAuthToken()
    const [data, setData] = useState(null)

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuthenticated) {
                await signOut({ callbackUrl: '/login' })
            }
        }
        checkAuthentication()
    }, [])

    const handleClick = async () => {
        const fetchData = async () => {
            const response = await fetchApi(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/me/`)
            const result = await response.json()
            setData(result)
          }
          fetchData()
    }

    return (
        <div>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default HomeView