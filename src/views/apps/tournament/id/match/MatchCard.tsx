'use client'
import { Match } from "@/types/apps/tournament/matchTypes"
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import CustomAvatar from '@/@core/components/mui/Avatar'
import OptionMenu from '@/@core/components/option-menu'
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import MatchSets from "./MatchSets"
import MatchPlayer from "./MatchPlayer"
import { formatDate } from "@/utils/string"
import useRoleBasedAccess from "@/hooks/useRoleBasedAccess"
import Role from "@/types/apps/user/role"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import EditMatchDialog from './EditMatchDialog'

type MatchCardProps = {
    match: Match
}

const MatchCard = ({ match }: MatchCardProps) => {
    const { hasRequiredRole: isAdmin, isLoading } = useRoleBasedAccess(Role.ADMIN)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { fetchApi } = useAuthToken()
    const router = useRouter()

    const handleUpdateMatch = async (data: { scheduled_at: string; location: string }) => {
        setIsEditing(true)
        try {
            const response = await fetchApi(`/matches/${match.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                toast.success('Partido actualizado exitosamente')
                setIsEditOpen(false)
                router.refresh()
            } else {
                toast.error('Error al actualizar el partido')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error al actualizar el partido')
        } finally {
            setIsEditing(false)
        }
    }


    // Opciones del menú dropdown
    const menuOptions = [
        {
            text: 'Editar',
            icon: 'tabler-edit',
            menuItemProps: {
                onClick: () => {
                    setIsEditOpen(true)
                }
            }
        },
        {
            text: 'Agregar resultados',
            icon: (
                <Box
                    component='span'
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: 1,
                        backgroundColor: '#e5e7eb',
                        color: '#374151',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        marginRight: 1.5
                    }}
                >
                    3:0
                </Box>
            ),
            menuItemProps: {
                onClick: () => {
                    // TODO: Implementar lógica para agregar resultados
                    console.log('Agregar resultados:', match.id)
                }
            }
        },
        {
            text: 'Eliminar',
            icon: 'tabler-trash',
            menuItemProps: {
                onClick: () => {
                    // TODO: Implementar lógica de eliminación
                    console.log('Eliminar partido:', match.id)
                }
            }
        }
    ]

    return (
        <Card
            className='w-full'
            sx={{
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            {/* Header teal con estado y menú */}
            <Box
                sx={{
                    backgroundColor: '#14b8a6', // Teal color
                    zIndex: 1050,  // para que el menú dropdown aparezca por encima de los sets
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingY: isAdmin ? 0 : 1
                }}
            >

                <Box className='flex z-[1051] items-center gap-2 w-full'>
                    {
                        isAdmin && (
                            <OptionMenu
                                options={menuOptions}
                                leftAlignMenu={true}
                                icon='tabler-dots-vertical'
                                iconClassName='text-white text-xl  '
                                iconButtonProps={{
                                    sx: {
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }
                                }}
                            />
                        )
                    }
                    <Box className='flex items-center justify-between gap-2 w-full'>
                        <div className='flex items-center justify-center sm:flex gap-2 w-full'>
                            <i className='tabler-calendar-event-filled text-lg text-white hidden sm:block z-[1]' />
                            <Typography className='text-white text-sm font-bold'>{formatDate(match.scheduled_at, 'dddd, DD')}</Typography>
                        </div>
                        <div className='flex items-center justify-center sm:flex gap-2 w-full'>
                            <i className='tabler-clock text-lg text-white hidden sm:block' />
                            <Typography className='text-white text-sm font-bold z-0'>{formatDate(match.scheduled_at, 'hh:mm A')}</Typography>
                        </div>
                        <div className='flex items-center justify-center sm:flex gap-2 w-full'>
                            <i className='tabler-map-pin text-lg text-white hidden sm:block' />
                            <Typography className='text-white text-sm font-bold'>{match.location}</Typography>
                        </div>


                    </Box>
                </Box>


                {/* <Chip
                    label={statusLabel}
                    size='small'
                    sx={{
                        backgroundColor: 'white',
                        color: '#14b8a6',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                    }}
                /> */}
            </Box>

            {/* Cuerpo del card con participantes */}
            <Box sx={{ padding: { xs: 3, sm: 4 } }}>
                <Grid container spacing={3}>
                    {/* Team 1 */}
                    <Grid size={{ xs: 12 }} className='flex items-center'>
                        <Box className='flex w-full items-center gap-3 '>

                            <MatchPlayer
                                winner={match?.winner}
                                player={match?.player1}
                                partner={match?.partner1}
                                matchType={match?.match_type}
                            />

                            {/* Sets*/}
                            <MatchSets isPlayer1={true} maxSets={match?.max_sets} sets={match?.sets} />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>

                    {/* Team 2 */}
                    <Grid size={{ xs: 12 }} className='flex items-center'>
                        <Box className='flex items-center gap-3 flex-1'>

                            <MatchPlayer winner={match?.winner} player={match?.player2} partner={match?.partner2} matchType={match?.match_type} />


                            {/* Sets*/}
                            <MatchSets isPlayer1={false} maxSets={match?.max_sets} sets={match?.sets} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <EditMatchDialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                match={match}
                onUpdate={handleUpdateMatch}
                isLoading={isEditing}
            />
        </Card >
    )
}

export default MatchCard