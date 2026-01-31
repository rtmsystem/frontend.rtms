
import { serverFetchApi } from '@/hooks/authServer'
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import { ChildrenType } from '@/@core/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/libs/auth'
import { redirect } from 'next/navigation'
import Role from '@/types/apps/user/role'
import StandingsTab from '@/views/apps/tournament/id/standings'


type TournamentStandingsPageProps = ChildrenType & {
    params: Promise<{
        id: string
    }>
}
const TournamentStandingsPage = async (props: TournamentStandingsPageProps) => {
    const { params } = props
    const { id: tournamentId } = await params

    // Verificar si el usuario es admin
    const session = await getServerSession(authOptions)
    const userRole = session?.user?.role || Role.GUEST[2]
    const isAdmin = Role.ADMIN.includes(userRole)

    // Fetch standings and matches in parallel
    const [standingsResponse, matchesResponse] = await Promise.all([
        serverFetchApi(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tournaments/${tournamentId}/groups/`
        ),
        serverFetchApi(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/matches?tournament_id=${tournamentId}`
        )
    ])

    const standingsData = await standingsResponse.json()
    const matchesData = await matchesResponse.json()

    const standings = standingsData.data || []
    const matches = matchesData.data || []

    return <StandingsTab groups={standings} matches={matches} />
}

export default TournamentStandingsPage
