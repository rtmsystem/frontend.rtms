'use client'
import CustomAvatar from '@/@core/components/mui/Avatar'
import SelectDropdown from '@/components/layout/shared/SelectDropdown'
import type { Match } from '@/types/apps/tournament/matchTypes'
import { Division } from '@/types/apps/tournament/tournamentTypes'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { useMemo, useState, useEffect } from 'react'
import { useTournament } from '@/contexts/TournamentContext'
import EmptyState from '@/components/EmptyState'
import AlertTitle from '@mui/material/AlertTitle'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import GenerateMatchesCard from './GenerateMatchesCard'
import ScheduleSettingsCard from './ScheduleSettingsCard'
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import { maxBytes } from 'valibot'
import MatchCard from './MatchCard'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import Role from '@/types/apps/user/role'
import { useForm, FormProvider } from 'react-hook-form'

type MatchTabProps = {
    matches: Match[]
}

const MatchTab = ({ matches }: MatchTabProps) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
    const tournament = useTournament()
    const [divisions, setDivisions] = useState<Division[]>(tournament.tournament.divisions || [])
    const [allMatches, setAllMatches] = useState<Match[]>(matches)
    const { fetchApi } = useAuthToken()
    const [generateMatchesLoading, setGenerateMatchesLoading] = useState<boolean>(false)
    const [scheduleMatchesLoading, setScheduleMatchesLoading] = useState<boolean>(false)
    const { hasRequiredRole: isAdmin, isLoading } = useRoleBasedAccess(Role.ADMIN)
    const methods = useForm<FormData>({})

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




    const handleGenerateMatches = async (data?: any) => {
        console.log('Generate payload:', data)
        if (!divisions || divisions.length === 0 || !divisions[selectedCategoryIndex]) {
            toast.error('No hay categorías disponibles')
            return
        }

        setGenerateMatchesLoading(true)
        try {
            let response = null
            if (divisions[selectedCategoryIndex].format === 'knockout') {
                response = await generateBracketCall()
            }

            if (divisions[selectedCategoryIndex].format === 'round_robin_knockout') {
                response = await generateMatchesGroupCall(data)
            }

            if (!response) {
                ``
                throw new Error('Formato no soportado')
            }

            const result = await response.json()
            if (result.success) {
                // La respuesta puede venir en result.matches o result.data
                const newMatches = result.matches || result.data || []

                // Validar que sea un array antes de hacer el spread
                if (Array.isArray(newMatches)) {
                    setAllMatches([...allMatches, ...newMatches])
                    toast.success('Partidos generados exitosamente')
                } else {
                    toast.error('Error: La respuesta no tiene el formato esperado')
                }
            } else {
                toast.error(result.message || 'Error al generar los partidos')
            }
        } catch (error) {
            toast.error('Error al generar los partidos')
        } finally {
            setGenerateMatchesLoading(false)
        }
    }

    const generateBracketCall = async () => {
        return await fetchApi(`/matches/generate-bracket/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                division_id: divisions[selectedCategoryIndex].id,
                max_sets: 5,
                points_per_set: 1,
            })
        })
    }

    const generateMatchesGroupCall = async (data: any) => {
        return await fetchApi(`/matches/generate-group-phase/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                division_id: divisions[selectedCategoryIndex].id,
                max_sets: 5,
                points_per_set: 1,
            })
        })
    }


    // Filtrar involvements por la categoría seleccionada
    const filteredMatches: Match[] = useMemo(() => {

        if (!divisions || divisions.length === 0) {
            return allMatches
        }

        const selectedMatch = allMatches[selectedCategoryIndex]
        if (!selectedMatch) {
            return allMatches
        }

        return allMatches.filter(
            (allMatches) => allMatches.division_name === divisions[selectedCategoryIndex].name
        )
    }, [allMatches, selectedCategoryIndex, divisions])


    return (
        <Grid container spacing={6}>
            <Grid className="flex w-full justify-between md:flex-nowrap flex-wrap  gap-4" size={{ xs: 12 }}>
                <div className='flex w-full items-center gap-4'>
                    <CustomAvatar color='primary' variant='rounded' size={50}>
                        <i className='tabler-calendar-stats text-xl text-white' />
                    </CustomAvatar>
                    <div>
                        <Typography variant='h5'>Partidos</Typography>

                    </div>
                </div>
                <div className='flex justify-end w-full sm:flex-nowrap flex-wrap  items-center gap-4 '>
                    <SelectDropdown
                        selectedIndex={selectedCategoryIndex}
                        onSelectionChange={setSelectedCategoryIndex}
                    />
                </div>
            </Grid>
            <Grid className='flex w-full' size={{ xs: 12 }} container spacing={3} >
                {
                    divisions.length > 0 && divisions[selectedCategoryIndex] && (divisions[selectedCategoryIndex].is_published) ? (
                        <>
                            {
                                filteredMatches?.length > 0 ? (
                                    <>
                                        {
                                            filteredMatches.map((match) => (
                                                <Grid size={{ xs: 12, md: 6 }} key={match.id}>
                                                    <MatchCard match={match} />
                                                </Grid >
                                            ))
                                        }
                                    </>
                                ) : (
                                    <div className="flex w-full justify-center gap-2" >
                                        <FormProvider {...methods}>
                                            <GenerateMatchesCard
                                                selectedDivision={divisions[selectedCategoryIndex]}
                                                handleGenerateMatches={handleGenerateMatches}
                                                generateMatchesLoading={generateMatchesLoading}
                                            />

                                            <ScheduleSettingsCard
                                                onSchedule={handleGenerateMatches}
                                                isLoading={scheduleMatchesLoading}
                                            />

                                        </FormProvider>



                                    </div>
                                )
                            }
                        </>
                    ) :
                        isAdmin ?

                            (
                                <Alert className='w-full' severity='warning'>
                                    <AlertTitle>Los Jugadores de la categoría no han sido confirmados</AlertTitle>
                                    <Typography variant='body2'>La jugadores de la categoría no han sido confirmados, para poder gestionar los partidos se deben confirmar los jugadores</Typography>
                                </Alert>
                            ) :
                            (
                                <EmptyState
                                    icon='tabler-calendar-stats'
                                    title='No hay partidos programados'
                                    description='¡Mantente atento! Muy pronto estaremos publicando los partidos del torneo.'
                                />
                            )
                }
            </Grid>
        </Grid>
    )
}

export default MatchTab