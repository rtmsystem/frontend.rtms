
import CustomAvatar from '@/@core/components/mui/Avatar'
import { Involvement } from '@/types/apps/tournament/involvementTypes'
import { formatDate } from '@/utils/string'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAuthToken } from '@/hooks/useAuthToken'

type PlayerCardProps = {
    involvement: Involvement
}

const PlayerCard = ({ involvement }: PlayerCardProps) => {
    const isDoubles = involvement.participant_type === 'doubles'
    const [status, setStatus] = useState<string>(involvement.status)
    const [loading, setLoading] = useState<boolean>(false)
    const [statusLabel, setStatusLabel] = useState<string>(involvement.status === 'approved' ? 'Aceptado' : involvement.status === 'rejected' ? 'Rechazado' : 'Pendiente')
    const { fetchApi } = useAuthToken()

    const approveInvolvement = async () => {
        setLoading(true)
        const response = await fetchApi(`/tournaments/${involvement.tournament}/involvements/${involvement.id}/approve/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        if (result.success) {
            toast.success('Inscripción aprobada exitosamente')
            setStatus('approved') 
            setLoading(false)
            setStatusLabel('Aceptado')
        } else {
            toast.error(result.message)
            setLoading(false)
        }
    }

    const rejectInvolvement = async () => {
        setLoading(true)
        const response = await fetchApi(`/tournaments/${involvement.tournament}/involvements/${involvement.id}/reject/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        if (result.success) {
            toast.success('Inscripción rechazada exitosamente')
            setStatus('rejected')
            setLoading(false)
            setStatusLabel('Rechazado')
        } else {
            toast.error(result.message)
            setLoading(false)
        }
    }
    return (
        <Card className='mb-3'>
            <Grid container spacing={{ xs: 2, sm: 3 }} className='px-4 sm:px-6 py-4 sm:py-3'>
                {/* Jugador 1 */}
                <Grid size={{ xs: 12, sm: isDoubles ? 6 : 4 }} className='flex items-center gap-2 sm:gap-3'>
                    <CustomAvatar src={involvement.player_avatar || ''} size={40} />
                    <div className='flex-1 min-w-0'>
                        <Typography variant='h6' className='text-sm sm:text-base truncate'>
                            {involvement.player_first_name} {involvement.player_last_name}
                        </Typography>
                        <Typography variant='body2' className='text-xs sm:text-sm text-gray-500 truncate'>
                            {involvement.player_email}
                        </Typography>
                    </div>
                </Grid>

                {/* Jugador 2 (solo si es doubles) */}
                {isDoubles && (
                    <>
                        <Grid size={{ xs: 12, sm: 6 }} className='flex items-center gap-2 sm:gap-3'>
                            <CustomAvatar src={involvement.partner_avatar || ''} size={40} />
                            <div className='flex-1 min-w-0'>
                                <Typography variant='h6' className='text-sm sm:text-base truncate'>
                                    {involvement.partner_first_name} {involvement.partner_last_name}
                                </Typography>
                                <Typography variant='body2' className='text-xs sm:text-sm text-gray-500 truncate'>
                                    {involvement.partner_email}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <Divider className='my-2' />
                        </Grid>
                    </>
                )}

                {/* Estado */}
                <Grid size={{ xs: 6, sm: isDoubles ? 3 : 3 }} className='flex items-center'>
                    <Chip
                        variant='tonal'
                        label={statusLabel}
                        size='small'
                        color={status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'warning'}
                        className='capitalize'
                    />
                </Grid>

                {/* Fecha */}
                <Grid size={{ xs: 6, sm: isDoubles ? 3 : 2 }} className='flex flex-col justify-center'>
                    <Typography variant='body2' className='text-xs sm:text-sm text-gray-500'>
                        Incripción
                    </Typography>
                    <Typography variant='body2' className='text-sm '>
                        {formatDate(involvement.created_at, 'DD MMM YYYY')}
                    </Typography>
                </Grid>

                
                {
                    status === 'pending' && (
                        <Grid 
                            size={{ xs: 12, sm: isDoubles ? 6 : 'auto'}} 
                            className='flex items-center justify-end gap-2'
                        >
                            <LoadingButton
                                loading={loading}
                                loadingPosition='start'
                                onClick={approveInvolvement}
                                size='small'
                                startIcon={<i className='tabler-check text-lg sm:text-xl' />}
                                variant='outlined'
                                color='success'
                                className='text-xs sm:text-sm'
                            >
                                Aceptar
                            </LoadingButton>
                            <LoadingButton
                    disabled={loading}
                        loading={loading}
                        loadingPosition='start'
                        onClick={rejectInvolvement}
                        size='small'
                        startIcon={<i className='tabler-x text-lg sm:text-xl' />}
                        variant='outlined'
                        color='error'
                        className='text-xs sm:text-sm'
                    >
                        Rechazar
                    </LoadingButton>
                        </Grid>
                    )
                }
              
            </Grid>
        </Card>
    )
}

export default PlayerCard
