import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Role from "@/types/apps/user/role";

const useRoleBasedAccess = (requiredRoles:string[] = [], requiredPermissions: string[] = []) => {
    const { data: session, status } = useSession()
    const [userPermissions, setUserPermissions] = useState<string[]>([])

    // Calcular el rol directamente desde la sesión
    const userRole = session?.user?.role || Role.GUEST[2]
    const hasRequiredRole = requiredRoles.some(role => role === userRole)

    // Check if the user has all the required permissions
    const hasRequiredPermissions = requiredPermissions.every(permission =>
        userPermissions.includes(permission)
    );
    
    // Está cargando solo si la sesión está cargando
    const isLoading = status === 'loading'
    
    return {
        hasRequiredRole,
        hasRequiredPermissions,
        isLoading
    }
}

export default useRoleBasedAccess