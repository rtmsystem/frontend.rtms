'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Match } from "@/types/apps/tournament/matchTypes"
import { Player } from '@/types/apps/tournament/playerTypes'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import OptionMenu from '@/@core/components/option-menu'
import CustomAvatar from '@/@core/components/mui/Avatar'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import Role from '@/types/apps/user/role'
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import { formatDate } from '@/utils/string'
import EditMatchDialog from '@/views/apps/tournament/id/match/EditMatchDialog'
import AddMatchResultsModal from '@/views/apps/tournament/id/match/AddMatchResultsModal'

type BracketMatchCardProps = {
    match: Match
}

// Componente compacto para fila de jugador
const PlayerRow = ({
    player,
    partner,
    isDoubles,
    setsWon,
    isWinner
}: {
    player: Player | null
    partner: Player | null
    isDoubles: boolean
    setsWon: number
    isWinner: boolean
}) => {
    const playerName = player ? `${player.first_name?.[0]}. ${player.last_name}` : 'Por definir'
    const partnerName = partner ? `${partner.first_name?.[0]}. ${partner.last_name}` : ''

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 0.5,
                px: 1,
                backgroundColor: isWinner ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
                minHeight: 36,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flex: 1, minWidth: 0 }}>
                {isDoubles ? (
                    <Box sx={{ display: 'flex' }}>
                        <CustomAvatar src={player?.avatar || ''} alt={player?.first_name} size={24} />
                        <CustomAvatar src={partner?.avatar || ''} alt={partner?.first_name} size={24} sx={{ ml: -1 }} />
                    </Box>
                ) : (
                    <CustomAvatar src={player?.avatar || ''} alt={player?.first_name} size={24} />
                )}
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: isWinner ? 600 : 400,
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: player ? 'text.primary' : 'text.disabled',
                        fontStyle: player ? 'normal' : 'italic'
                    }}
                >
                    {isDoubles && partner ? `${playerName} / ${partnerName}` : playerName}
                </Typography>
            </Box>
            <Box
            
                sx={{
                    minWidth: 24,
                    height: 24,
                    borderRadius: 0.5,
                    backgroundColor: isWinner ? 'primary.main' : 'transparent',
                    color: isWinner ? 'white' : 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    ml: 1
                }}
            >
                {setsWon}
            </Box>
        </Box>
    )
}

const BracketMatchCard = ({ match }: BracketMatchCardProps) => {
    const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddResultsOpen, setIsAddResultsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [infoAnchorEl, setInfoAnchorEl] = useState<null | HTMLElement>(null)
    const { fetchApi } = useAuthToken()
    const router = useRouter()

    const handleInfoClick = (event: React.MouseEvent<HTMLElement>) => {
        setInfoAnchorEl(event.currentTarget)
    }

    const handleInfoClose = () => {
        setInfoAnchorEl(null)
    }

    const handleUpdateMatch = async (data: { scheduled_at: string; location: string }) => {
        setIsEditing(true)
        try {
            const response = await fetchApi(`/matches/${match.id}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
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

    const handleAddResultsSuccess = () => {
        setIsAddResultsOpen(false)
        router.refresh()
    }

    const menuOptions = [
        {
            text: 'Editar',
            icon: 'tabler-edit',
            menuItemProps: { onClick: () => setIsEditOpen(true) }
        },
        {
            text: 'Agregar resultados',
            icon: 'tabler-tournament',
            menuItemProps: { onClick: () => setIsAddResultsOpen(true) }
        },
        {
            text: 'Eliminar',
            icon: 'tabler-trash',
            menuItemProps: { onClick: () => console.log('Eliminar partido:', match.id) }
        }
    ]

    const isPlayer1Winner = match?.winner?.id === match?.player1?.id
    const isPlayer2Winner = match?.winner?.id === match?.player2?.id
    const isDoubles = match?.match_type === 'doubles'

    return (
        <Card
            sx={{
                borderRadius: 1,
                boxShadow: 1,
                overflow: 'hidden',
                width: 240,
            }}
        >
            {/* Header compacto teal */}
            <Box
                sx={{
                    backgroundColor: '#14b8a6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 30,
                    px: 0.5
                }}
            >
                {isAdmin ? (
                    <OptionMenu
                        options={menuOptions}
                        leftAlignMenu
                        icon='tabler-dots-vertical'
                        iconClassName='text-white text-sm'
                        iconButtonProps={{
                            size: 'small',
                            sx: {
                                color: 'white',
                                p: 0.25,
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                            }
                        }}
                    />
                ) : <Box />}

                {/* Icono de información */}
                <IconButton
                    size="medium"
                    onClick={handleInfoClick}
                    sx={{
                        color: 'white',
                        // p: 0.25,
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' }
                    }}
                >
                    <i className='tabler-info-circle text-sm' />
                </IconButton>

                {/* Menu con detalles del partido */}
                <Menu
                    anchorEl={infoAnchorEl}
                    open={Boolean(infoAnchorEl)}
                    onClose={handleInfoClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    slotProps={{
                        paper: {
                            sx: {
                                minWidth: 200,
                                p: 1.5,
                                mt: 0.5
                            }
                        }
                    }}
                >
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5, color: 'primary.main' }}>
                        Detalles del Partido
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <i className='tabler-calendar text-base text-gray-500' />
                        <Typography variant="body2">
                            {match.scheduled_at ? formatDate(match.scheduled_at, 'DD/MM/YYYY') : 'Sin fecha'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <i className='tabler-clock text-base text-gray-500' />
                        <Typography variant="body2">
                            {match.scheduled_at ? formatDate(match.scheduled_at, 'hh:mm A') : 'Sin hora'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <i className='tabler-map-pin text-base text-gray-500' />
                        <Typography variant="body2">
                            {match.location || 'Sin ubicación'}
                        </Typography>
                    </Box>
                </Menu>
            </Box>

            {/* Player 1 */}
            <PlayerRow
                player={match?.player1}
                partner={match?.partner1}
                isDoubles={isDoubles}
                setsWon={match?.sets_won_by_player1 ?? 0}
                isWinner={isPlayer1Winner}
            />

            <Divider />

            {/* Player 2 */}
            <PlayerRow
                player={match?.player2}
                partner={match?.partner2}
                isDoubles={isDoubles}
                setsWon={match?.sets_won_by_player2 ?? 0}
                isWinner={isPlayer2Winner}
            />

            <EditMatchDialog
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                match={match}
                onUpdate={handleUpdateMatch}
                isLoading={isEditing}
            />
            <AddMatchResultsModal
                open={isAddResultsOpen}
                onClose={() => setIsAddResultsOpen(false)}
                match={match}
                onSuccess={handleAddResultsSuccess}
            />
        </Card>
    )
}

export default BracketMatchCard
