import { useEffect } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import LoadingButton from '@mui/lab/LoadingButton'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Form Imports
import { useForm, Controller } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, minLength } from 'valibot'
import type { InferInput } from 'valibot'

// Type Imports
import { Match } from "@/types/apps/tournament/matchTypes"

// Utils
import { formatDate } from "@/utils/string"

const schema = object({
    scheduled_at: pipe(string(), minLength(1, 'La fecha y hora son requeridas')),
    location: pipe(string(), minLength(1, 'La ubicación es requerida'))
})

type FormData = InferInput<typeof schema>

type EditMatchDialogProps = {
    open: boolean
    onClose: () => void
    match: Match
    onUpdate: (data: { scheduled_at: string; location: string }) => Promise<void>
    isLoading?: boolean
}

const EditMatchDialog = ({ open, onClose, match, onUpdate, isLoading }: EditMatchDialogProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: valibotResolver(schema),
        defaultValues: {
            scheduled_at: '',
            location: ''
        }
    })

    useEffect(() => {
        if (match && open) {
            reset({
                scheduled_at: match.scheduled_at,
                location: match.location || ''
            })
        }
    }, [match, open, reset])

    const onSubmit = (data: FormData) => {
        onUpdate({
            scheduled_at: data.scheduled_at,
            location: data.location
        })
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='sm'
            fullWidth
            aria-labelledby='edit-match-title'
        >
            <DialogTitle id='edit-match-title'>Editar Partido</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name='scheduled_at'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <AppReactDatepicker
                                        selected={value ? new Date(value) : null}
                                        onChange={(date: Date | null) => onChange(date ? date.toISOString() : '')}
                                        showTimeSelect
                                        timeFormat="hh:mm aa"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd hh:mm aa"
                                        timeCaption="Hora"
                                        customInput={
                                            <CustomTextField
                                                value={value ? formatDate(value, 'YYYY-MM-DD hh:mm A') : ''}
                                                onChange={onChange}
                                                fullWidth
                                                label='Fecha y Hora'
                                                error={!!errors.scheduled_at}
                                                helperText={errors.scheduled_at?.message}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name='location'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <CustomTextField
                                        select
                                        fullWidth
                                        label='Ubicación'
                                        value={value}
                                        onChange={onChange}
                                        error={!!errors.location}
                                        helperText={errors.location?.message}
                                    >
                                        <MenuItem value='Cancha 1'>Cancha 1</MenuItem>
                                        <MenuItem value='Cancha 2'>Cancha 2</MenuItem>
                                        <MenuItem value='Cancha 3'>Cancha 3</MenuItem>
                                    </CustomTextField>
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary' disabled={isLoading}>
                        Cancelar
                    </Button>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={isLoading}
                    >
                        Guardar
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditMatchDialog
