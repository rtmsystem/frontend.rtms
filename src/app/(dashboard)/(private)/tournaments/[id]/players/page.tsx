import { serverFetchApi } from '@/hooks/authServer'
import PlayersTab from '@/views/apps/tournament/id/players'
import type { ChildrenType } from '@core/types'
import type { Involvement } from '@/types/apps/tournament/involvementTypes'

type TournamentPlayerPageProps = ChildrenType & {
    params: Promise<{
        id: string
    }>
}
const TournamentPlayerPage = async (props: TournamentPlayerPageProps) => {
    const { params } = props
    const { id: tournamentId } = await params
    

    const response = await serverFetchApi(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tournaments/${tournamentId}/involvements/`
    )

    const involvementsData = await response.json()
   
    const involvements: Involvement[] = involvementsData.results

    return (
        <PlayersTab involvements={involvements} />
    )
}

export default TournamentPlayerPage