'use client'
// React Imports
import { useState, useEffect, useMemo } from 'react'
import type {  SyntheticEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import type { Tournament } from '@/types/apps/tournament/tournamentTypes'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'

// Component Imports
import TournamentHeader from './TournamentHeader'
import CustomTabList from '@core/components/mui/TabList'
import { CountryType } from '@/types/apps/geographical/countries'
import Role from '@/types/apps/user/role'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import { useTournament } from '@/contexts/TournamentContext'


type TournamentContentProps = {
    tournament?: Tournament
  }


const tabs = [
    {
        label: 'Inicio',
        value: 'home',
        icon: <i className='tabler-home text-xl' />
    },
    {
        label: 'Jugadores',
        value: 'players',
        icon: <i className='tabler-users text-xl' />
    },
    {
        label: 'Partidos',
        value: 'matches',
        icon: <i className='tabler-calendar-stats text-xl' />
    },
    {
        label: 'Ajustes',
        value: 'settings',
        icon: <i className='tabler-layout-grid text-xl' />
    },
    {
        label: 'Finanzas',
        value: 'finance',
        icon: <i className='tabler-currency-dollar text-xl' />
    }
]

const TournamentContent = ({  tournament: tournamentProp }: TournamentContentProps) => {
    const path = usePathname()
    const router = useRouter()
    const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)
    const showSettingsTab = isAdmin
    
    // Obtener el torneo del contexto (fuente principal) o usar la prop como fallback
    const contextTournament = useTournament()
    const tournament = contextTournament.tournament || tournamentProp
   
    // Obtener el tab actual de la URL usando useMemo para evitar recálculos innecesarios
    const currentTabFromPath = useMemo(() => {
        const tabFromPath = path.split('/').pop() || 'home'
        // Si el tab es "settings" pero no se debe mostrar, usar "home" como fallback
        return showSettingsTab ? tabFromPath : (tabFromPath === 'settings' ? 'home' : tabFromPath)
    }, [path, showSettingsTab])
    
    const [activeTab, setActiveTab] = useState(() => currentTabFromPath)
    
    // Sincronizar activeTab con la URL cuando cambia
    useEffect(() => {
        setActiveTab(currentTabFromPath)
    }, [currentTabFromPath])
    
    const handleChange = (event: SyntheticEvent, value: string) => {
        if (!tournament?.id) {
            console.error('Tournament ID is missing, cannot navigate')
            return
        }
        setActiveTab(value)
        router.push(`/tournaments/${tournament.id}/${value}`)
    }

    return (
        <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
                <TournamentHeader tournament={tournament} />
            </Grid>
            {activeTab === undefined ? null : (
                <Grid size={{ xs: 12 }} className='flex flex-col gap-6'>
                    <TabContext value={activeTab}>
                        <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
                            {tabs.map((tab) => {
                                if ((tab.value === 'settings' || tab.value === 'finance') && !showSettingsTab) {
                                    return null
                                }
                                return (
                                    <Tab
                                        key={tab.value}
                                        value={tab.value}
                                        label={
                                            <div className='flex items-center gap-1.5'>
                                                {tab.icon}
                                                {tab.label}
                                            </div>
                                        }
                                    />
                                )
                            })}
                        </CustomTabList>

                        
                    </TabContext>
                </Grid>
            )}

        </Grid>

    )
}

export default TournamentContent