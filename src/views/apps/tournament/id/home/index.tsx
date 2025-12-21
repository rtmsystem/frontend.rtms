'use client'
import type { ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import InformationCard from './InformationCard'
import AboutTournament from './AboutTournament'
import TournamentContact from './TournamentContact'
import TournamentDivisionCard from './TournamentDivisionCard'
import { useTournament } from '@/contexts/TournamentContext'

const HomeTab = () => {

    const { tournament } = useTournament()

    return (
        <Grid container spacing={6}>
            <Grid className='flex flex-col gap-6' size={{ xs: 12, md: 7, lg: 8 }}>
                <InformationCard tournament={tournament} />
                {
                    tournament?.description && (
                        <AboutTournament tournament={tournament} />
                    )
                }
            </Grid>
            <Grid size={{ xs: 12, md: 5, lg: 4 }} >
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12 }}>
                        <TournamentContact tournament={tournament} />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TournamentDivisionCard tournament={tournament} />
                    </Grid>
                </Grid>
            </Grid>
           
        </Grid>
       
    )
}

export default HomeTab