'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

import CustomAvatar from '@core/components/mui/Avatar'
import Typography from '@mui/material/Typography'
import SelectDropdown from '@/components/layout/shared/SelectDropdown'
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
import PlayerPublicCard from './PublicPlayerCard'

type PlayersTabProps = {
    involvements: Involvement[]
}
const PlayerContent = ({ involvements }: PlayersTabProps) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
    const tournament = useTournament()
    const { fetchApi } = useAuthToken()
    const [confirmError, setConfirmError] = useState<string | null>(null)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    

    const [divisions, setDivisions] = useState<Division[]>(tournament.tournament.divisions || [])

    const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)

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


    const confirmDivision = async () => {
        setConfirmError(null)
        setConfirmLoading(true)
        const response = await fetchApi(`/tournaments/${tournament.tournament.id}/divisions/${divisions[selectedCategoryIndex].id}/publish/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        if (result.success) {
            toast.success('Categoría publicada exitosamente.')
            setDivisions(prev => prev.map((division, index) => index === selectedCategoryIndex ? { ...division, is_published: true } : division))
            setConfirmLoading(false)

        } else {
            setConfirmLoading(false)
            setConfirmError(result.message)
        }
    }

    // Filtrar involvements por la categoría seleccionada
    const filteredInvolvements = useMemo(() => {
        if (!divisions || divisions.length === 0) {
            return involvements
        }

        const selectedDivision = divisions[selectedCategoryIndex]
        if (!selectedDivision) {
            return involvements
        }

        return involvements.filter(
            (involvement) => involvement.division === selectedDivision.id
        )
    }, [involvements, selectedCategoryIndex, divisions])

    return (
        <Grid container spacing={6}>

            <Grid className="flex w-full justify-between md:flex-nowrap flex-wrap  gap-4" size={{ xs: 12 }}>
                <div className='flex w-full items-center gap-4'>
                    <CustomAvatar color='primary' variant='rounded' size={50}>
                        <i className='tabler-users text-xl text-white' />
                    </CustomAvatar>
                    <div>
                        <Typography variant='h5'>Jugadores</Typography>
                        {
                            divisions[selectedCategoryIndex]?.is_published && (
                                <div className='flex  w-auto gap-2'>
                                    <i className='tabler-circle-check text-success text-xl ' />
                                    <Typography className='text-success' color='success' variant='button'>
                                        Categoría confirmada</Typography>
                                </div>)}
                    </div>
                </div>
                <div className='flex justify-end w-full sm:flex-nowrap flex-wrap  items-center gap-4 '>
                    {
                        !divisions[selectedCategoryIndex]?.is_published &&

                        (
                            <LoadingButton
                                onClick={confirmDivision} color='warning'
                                loadingPosition='start'
                                loading={confirmLoading}
                                className='max-h-10 min-w-64' startIcon={<i className='tabler-progress-check' />}
                                variant='contained'>Confirmar {divisions[selectedCategoryIndex]?.name}</LoadingButton>
                        )
                    }

                    <SelectDropdown
                        disabled={confirmLoading}
                        selectedIndex={selectedCategoryIndex}
                        onSelectionChange={setSelectedCategoryIndex}
                    />
                </div>

            </Grid>

            {confirmError && (
                <Grid className="flex w-full justify-between md:flex-nowrap flex-wrap  gap-4" size={{ xs: 12 }}>
                    <Grow in={!!confirmError}  {...(!!confirmError ? { timeout: 700 } : {})}>
                        <Alert onClose={e => {
                            setConfirmError(null)
                        }} severity='error' className='mb-4 w-full'>{confirmError}</Alert>
                    </Grow>
                </Grid>
            )}

            <Grid size={{ xs: 12 }}>
                {filteredInvolvements.length > 0 ? (
                    filteredInvolvements.map((involvement,index) => {
                        return (
                            isAdmin ? (
                                <PlayerCard key={involvement.id} involvement={involvement} />
                            ) : (
                                <PlayerPublicCard index={index} key={involvement.id} involvement={involvement} />
                            )
                        )
                    })
                ) : (
                    <EmptyState
                        icon='tabler-users'
                        title={`No hay Jugadores Registrados en ${divisions[selectedCategoryIndex].name}`}
                        description='¡Mantente atento! Muy pronto publicaremos los jugadores que estarán compitiendo en el torneo!'
                        
                    />
                )}
            </Grid>
        </Grid>

    )
}


export default PlayerContent