import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid2 as Grid,
    IconButton,
    Badge,
    Divider
} from '@mui/material'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import CustomAvatar from '@/@core/components/mui/Avatar'
import CustomTextField from '@/@core/components/mui/TextField'
import { Match } from "@/types/apps/tournament/matchTypes"
import { useAuthToken } from '@/hooks/useAuthToken'
import AvatarGroup from "@mui/material/AvatarGroup"
import { Player } from "@/types/apps/tournament/playerTypes"

type AddMatchResultsModalProps = {
    open: boolean
    onClose: () => void
    match: Match
    onSuccess: () => void
}

type SetScore = {
    set_number: number
    player1_score: number
    player2_score: number
}

type FormValues = {
    sets: SetScore[]
}

const PlayerAvatar = ({ player, partner, matchType }: { player: Player, partner: Player | null, matchType: 'doubles' | 'singles' }) => {
    if (matchType === "doubles") {
        return (
            <AvatarGroup className='pull-up' max={2}>
                <Badge
                    overlap='circular'
                    className=' z-10'
                    badgeContent={<span className='text-xl'>🇨🇴</span>}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <CustomAvatar
                        skin='light'
                        color='success'
                        src={player?.avatar || ''}
                        alt={player?.first_name}

                        size={60}
                    />
                </Badge>
                <Badge
                    overlap='circular'

                    badgeContent={<span className='text-xl'>🇨🇴</span>}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <CustomAvatar
                        src={partner?.avatar || ''}
                        alt={partner?.first_name}
                        size={60}
                    />
                </Badge>
            </AvatarGroup>
        )
    }

    return (
        <Badge

            overlap='circular'
            badgeContent={<span className='text-xl'>🇨🇴</span>}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <CustomAvatar
                skin='light'
                color='success'
                src={player?.avatar || ''}
                alt={player?.first_name}
                size={60}
            />
        </Badge>
    )
}

const PlayerName = ({ player, partner }: { player: Player, partner: Player | null }) => {
    return (
        <Box className='flex flex-col'>
            <Typography variant="h5" noWrap>
                {player?.first_name} {player?.last_name}
            </Typography>
            {partner && (
                <Typography variant="h5" noWrap color="text.secondary">
                    {partner?.first_name} {partner?.last_name}
                </Typography>
            )}
        </Box>
    )
}

const AddMatchResultsModal = ({ open, onClose, match, onSuccess }: AddMatchResultsModalProps) => {
    const { fetchApi } = useAuthToken()
    const [isLoading, setIsLoading] = useState(false)

    const { control, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            sets: [
                { set_number: 1, player1_score: 0, player2_score: 0 },
                { set_number: 2, player1_score: 0, player2_score: 0 },
                { set_number: 3, player1_score: 0, player2_score: 0 },
                { set_number: 4, player1_score: 0, player2_score: 0 },
                { set_number: 5, player1_score: 0, player2_score: 0 }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sets"
    })

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            reset({
                sets: [
                    { set_number: 1, player1_score: 0, player2_score: 0 },
                    { set_number: 2, player1_score: 0, player2_score: 0 },
                    { set_number: 3, player1_score: 0, player2_score: 0 },
                    { set_number: 4, player1_score: 0, player2_score: 0 },
                    { set_number: 5, player1_score: 0, player2_score: 0 }
                ]
            })
        }
    }, [open, reset])

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        try {
            // Ensure set numbers are correct (1-based index)
            const payload = {
                sets: data.sets.map((set, index) => ({
                    ...set,
                    set_number: index + 1,
                    player1_score: Number(set.player1_score),
                    player2_score: Number(set.player2_score)
                }))
            }

            const response = await fetchApi(`/matches/${match.id}/scores/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                toast.success('Resultados agregados exitosamente')
                onSuccess()
                handleClose()
            } else {
                toast.error('Error al agregar resultados')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error al agregar resultados')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    const handleAddSet = () => {
        if (fields.length < match.max_sets) {
            append({ set_number: fields.length + 1, player1_score: 0, player2_score: 0 })
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" className="z-[10000]" fullWidth>
            <DialogTitle>Agregar Resultados</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Box className="mb-6">
                        {/* Header / Players */}
                        <Grid container spacing={2} className="mb-4 items-end">
                            <Grid size={{ xs: 5 }} className="flex flex-col items-center gap-2">
                                <PlayerAvatar player={match.player1} partner={match.partner1} matchType={match.match_type} />
                                <PlayerName player={match.player1} partner={match.partner1} />
                            </Grid>
                            <Grid size={{ xs: 2 }} className="flex justify-center pb-8">
                                <Typography variant="h6" color="text.secondary">VS</Typography>
                            </Grid>
                            <Grid size={{ xs: 5 }} className="flex flex-col items-center gap-2">
                                <PlayerAvatar player={match.player2} partner={match.partner2} matchType={match.match_type} />
                                <PlayerName player={match.player2} partner={match.partner2} />
                            </Grid>
                        </Grid>

                        <Divider className="my-4" />

                        {/* Sets Inputs */}
                        <Box className="flex flex-col gap-4">
                            {fields.map((field, index) => (
                                <Box key={field.id} className="flex items-center gap-4 justify-between bg-action-hover p-2 rounded">
                                    <Typography variant="body2" className="w-12 font-bold">
                                        Set {index + 1}
                                    </Typography>

                                    <div className="flex items-center gap-8 flex-1 justify-center">
                                        <Controller
                                            name={`sets.${index}.player1_score`}
                                            control={control}
                                            rules={{ required: true, min: 0 }}
                                            render={({ field }) => (
                                                <CustomTextField
                                                    {...field}
                                                    type="number"
                                                    sx={{ width: 80 }}
                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                />
                                            )}
                                        />
                                        <Typography>-</Typography>
                                        <Controller
                                            name={`sets.${index}.player2_score`}
                                            control={control}
                                            rules={{ required: true, min: 0 }}
                                            render={({ field }) => (
                                                <CustomTextField
                                                    {...field}
                                                    type="number"
                                                    sx={{ width: 80 }}
                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="w-12 flex justify-end">
                                        {fields.length > 1 && index === fields.length - 1 && (
                                            <IconButton size="small" color="error" onClick={() => remove(index)}>
                                                <i className='tabler-trash' />
                                            </IconButton>
                                        )}
                                    </div>
                                </Box>
                            ))}
                        </Box>

                        {fields.length < match.max_sets && (
                            <Button
                                onClick={handleAddSet}
                                startIcon={<i className='tabler-plus' />}
                                className="mt-4"
                                fullWidth
                                variant="tonal"
                            >
                                Agregar Set
                            </Button>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar Resultados'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddMatchResultsModal
