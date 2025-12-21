'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

import CustomAvatar from '@core/components/mui/Avatar'
import Typography from '@mui/material/Typography'
import SelectDropdown from '@/components/layout/shared/SelectDropdown'
import Button from '@mui/material/Button'
import { Involvement } from '@/types/apps/tournament/involvementTypes'
import PlayerCard from './PlayerCard'
import { useTournament } from '@/contexts/TournamentContext'
import EmptyState from '@/components/EmptyState'
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import { Division } from '@/types/apps/tournament/tournamentTypes'
import Grow from '@mui/material/Grow'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import Role from '@/types/apps/user/role'
import PlayerPublicContent from './PublicPlayerContent'
import PlayerContent from './PlayerContent'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

type PlayersTabProps = {
    involvements: Involvement[]
}
const PlayersTab = ({ involvements }: PlayersTabProps) => {

    const { hasRequiredRole: isAdmin, isLoading } = useRoleBasedAccess(Role.ADMIN)

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        )
    }

    if (isAdmin) return <PlayerContent involvements={involvements} />
        
    
    return (
        <PlayerPublicContent involvements={involvements} />
    )

    
}


export default PlayersTab 