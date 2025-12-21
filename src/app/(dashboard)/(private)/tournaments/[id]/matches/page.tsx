import { ChildrenType } from "@/@core/types"
import { serverFetchApi } from "@/hooks/authServer"
import MatchTab from "@/views/apps/tournament/id/match"
import type { Match } from '@/types/apps/tournament/matchTypes'

type MatchesPageProps = ChildrenType & {
    params: Promise<{
        id: string
    }>
}
const MatchesPage = async (props: MatchesPageProps) => {

    const { params } = props
    const { id: tournamentId } = await params
    

    const response = await serverFetchApi(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/matches?tournament_id=${tournamentId}`
    )

    const matchesData = await response.json()
   
    const matches: Match[] = matchesData.data
    return <MatchTab matches={matches} />
}

export default MatchesPage