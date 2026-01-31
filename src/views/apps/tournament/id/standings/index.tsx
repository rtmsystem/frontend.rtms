'use client'

import React, { useState, useMemo, useEffect } from 'react'
import type { MouseEvent } from 'react'
import CustomAvatar from '@/@core/components/mui/Avatar'
import SelectDropdown from '@/components/layout/shared/SelectDropdown'
import {
    Typography,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useTournament } from '@/contexts/TournamentContext'
import type { Division } from '@/types/apps/tournament/tournamentTypes'
import { GroupStanding } from '@/types/apps/tournament/standingsTypes'
import { Match } from '@/types/apps/tournament/matchTypes'
import StandingsTable from './StandingsTable'
import Brackets from './Brackets'
import EmptyState from '@/components/EmptyState'

type ViewMode = 'groups' | 'brackets'

interface StandingsTabProps {
    groups?: GroupStanding[]
    matches?: Match[]
}

const StandingsTab: React.FC<StandingsTabProps> = ({ groups = [], matches = [] }) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
    const [viewMode, setViewMode] = useState<ViewMode>('groups')
    const tournament = useTournament()
    const [divisions, setDivisions] = useState<Division[]>(tournament.tournament.divisions || [])

    // Sincronizar divisions cuando el torneo se actualiza
    useEffect(() => {
        if (tournament.tournament.divisions && tournament.tournament.divisions.length > 0) {
            setDivisions(tournament.tournament.divisions)
            // Si el índice seleccionado está fuera de rango, resetear a 0
            if (selectedCategoryIndex >= tournament.tournament.divisions.length) {
                setSelectedCategoryIndex(0)
            }
        }
    }, [tournament.tournament.divisions, selectedCategoryIndex])

    const handleViewModeChange = (event: MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
        if (newMode !== null) {
            setViewMode(newMode)
        }
    }

    const selectedDivision = divisions[selectedCategoryIndex]
    const selectedDivisionId = selectedDivision?.id

    const filteredStandings = useMemo(() => {
        if (!divisions || divisions.length === 0) {
            return groups
        }

        if (!selectedDivision) {
            return groups
        }

        return groups.filter(group => group.division === selectedDivision.id)
    }, [selectedCategoryIndex, groups, divisions, selectedDivision])

    const renderContent = () => {
        if (viewMode === 'groups') {
            if (filteredStandings.length > 0) {
                return (
                    <Grid className='w-full' container spacing={3}>
                        {filteredStandings.map((group) => (
                            <Grid size={{ xs: 12, md: 6 }} key={group.id}>
                                <StandingsTable key={group.id} group={group} />
                            </Grid>
                        ))}
                    </Grid>
                )
            }
            return (
                <EmptyState
                    icon='tabler-calendar-stats'
                    title='No hay clasificaciones'
                    description='¡Mantente atento! Muy pronto estaremos publicando las clasificaciones del torneo.'
                />
            )
        }

        // viewMode === 'brackets'
        return (
            <Brackets
                matches={matches}
                selectedDivisionId={selectedDivisionId}
            />
        )
    }

    return (
        <Grid container spacing={6}>
            <Grid className="flex w-full justify-between md:flex-nowrap flex-wrap gap-4" size={{ xs: 12 }}>
                <div className='flex w-full items-center gap-4'>
                    <CustomAvatar color='primary' variant='rounded' size={50}>
                        <i className='tabler-calendar-stats text-xl text-white' />
                    </CustomAvatar>
                    <div>
                        <Typography variant='h5'>Clasificación</Typography>
                    </div>
                </div>
                <div className='flex justify-end w-full sm:flex-nowrap flex-wrap items-center gap-4'>
                    <ToggleButtonGroup
                        exclusive
                        value={viewMode}
                        onChange={handleViewModeChange}
                        aria-label='vista de clasificación'
                        size='small'
                    >
                        <ToggleButton value='groups' aria-label='tabla de grupos'>
                            <i className='tabler-table mr-2' />
                            Grupos
                        </ToggleButton>
                        <ToggleButton value='brackets' aria-label='llaves de eliminación'>
                            <i className='tabler-tournament mr-2' />
                            Llaves
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <SelectDropdown
                        selectedIndex={selectedCategoryIndex}
                        onSelectionChange={setSelectedCategoryIndex}
                    />
                </div>
            </Grid>
            <Grid className='flex w-full' size={{ xs: 12 }}>
                {renderContent()}
            </Grid>
        </Grid>
    )
}

export default StandingsTab
