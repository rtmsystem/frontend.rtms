import SettingsTab from '@/views/apps/tournament/id/settings'
import { serverFetchApi } from '@/hooks/authServer'
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import { ChildrenType } from '@/@core/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/libs/auth'
import { redirect } from 'next/navigation'
import Role from '@/types/apps/user/role'


type TournamentSettingsPageProps = ChildrenType & {
    params: Promise<{
        id: string
    }>
}
const TournamentSettingsPage = async (props: TournamentSettingsPageProps) => {
    const { params } = props
    const { id: tournamentId } = await params
    
    // Verificar si el usuario es admin
    const session = await getServerSession(authOptions)
    const userRole = session?.user?.role || Role.GUEST[2]
    const isAdmin = Role.ADMIN.includes(userRole)
    
    // Si no es admin, redirigir a la página principal del torneo
    if (!isAdmin) {
        redirect(`/tournaments/${tournamentId}/home`)
    }
    
    const response = await serverFetchApi(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tournaments/${tournamentId}/`
    )
 
    const tournamentData = await response.json()
    const tournament: Tournament = tournamentData.data

    // // Verificar que el torneo esté publicado
    // if (tournament.status !== 'published') {
    //     redirect(`/tournaments/${tournamentId}/home`)
    // }

    return <SettingsTab tournament={tournament} />
}

export default TournamentSettingsPage