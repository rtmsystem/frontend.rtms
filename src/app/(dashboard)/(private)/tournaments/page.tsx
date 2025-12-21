import TournamentList from '@/views/apps/tournament/list'
import { serverFetchApi } from '@/hooks/authServer'
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'

const TournamentsPage = async () => {
    const response = await serverFetchApi(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tournaments/`)
    const tournamentData = await response.json()
    return <TournamentList tournaments={tournamentData.results as Tournament[]}/>
}

export default TournamentsPage