import type { ChildrenType } from '@core/types'
import {  serverFetchApi } from '@/hooks/authServer'
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import TournamentContent from '@/views/apps/tournament/id'
import { TournamentProvider } from '@/contexts/TournamentContext'
import type { CountryType } from '@/types/apps/geographical/countries'


type TournamentLayoutProps = ChildrenType & {
    params: Promise<{
        id: string
      }>
  }

const TournamentLayout = async (props: TournamentLayoutProps) => {
   
    const { children, params } = props
    const { id: tournamentId } = await params
    
    const response = await serverFetchApi(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tournaments/${tournamentId}/`)

    const countriesResponse = await serverFetchApi(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/geographical/countries/`)
   
    const tournamentData = await response.json()
    const tournament:Tournament = tournamentData.data
    const countriesData = await countriesResponse.json()
    const countries: CountryType[] = countriesData.data

    return (
        <TournamentProvider countries={countries} tournament={tournament}>  
        <div className='flex flex-col gap-6 flex-auto'>
            <TournamentContent  tournament={tournament} />
            <div>
            {children}
            </div>  
        </div>  
        </TournamentProvider>
        
    )

}

export default TournamentLayout