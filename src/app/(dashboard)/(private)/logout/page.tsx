'use client'
import { signOut } from "next-auth/react"
import{ useEffect } from "react"

const Logout = () => {
    useEffect(() => {
        const checkAuthentication = async () => {
                await signOut({ callbackUrl: '/login' })
            
        }
        checkAuthentication()
    }, [])
    
}

export default Logout