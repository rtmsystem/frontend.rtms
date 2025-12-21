import Grid from "@mui/material/Grid2"
import MenuItem from "@mui/material/MenuItem"
import { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"
import { InferInput } from "valibot"
import CustomTextField from "@/@core/components/mui/TextField"
import TournamentSchema from "@/valibot/tournament-schema"
import CustomIconButton from "@/@core/components/mui/IconButton"
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'


type TournamentFormData = InferInput<typeof TournamentSchema>

interface TournamenteDivisonItemProps {
    index: number
    control: Control<TournamentFormData>
    errors: FieldErrors<TournamentFormData>
    remove: (index: number) => void
}

const TournamentDivisonItem = ({ index, control, errors, remove }: TournamenteDivisonItemProps) => {

    return (
        <Grid className="mb-4 bg-gray-50 border border-gray-200 rounded-md p-4" container spacing={4}>
            {index > 0 && (
                <Grid className="flex justify-end" size={{ xs: 12 }}>
                    <CustomIconButton aria-label='capture screenshot' color='error' size='small' onClick={() => remove(index)}>
                        <i className='tabler-trash' />
                    </CustomIconButton>
                </Grid>
            )}
            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`divisions.${index}.name` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            label='Nombre de la Categoría'
                            error={Boolean(errors?.divisions?.[index]?.name)}
                            helperText={errors?.divisions?.[index]?.name?.message as string | undefined}
                        />
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>

                <Controller
                    name={`divisions.${index}.format` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            select
                            label='Formato'
                            error={Boolean(errors?.divisions?.[index]?.format)}
                            helperText={errors?.divisions?.[index]?.format?.message as string | undefined}
                        >
                            <MenuItem value='knockout'>Eliminación directa</MenuItem>
                            <MenuItem value='double_slash'>Doble eliminación</MenuItem>
                            <MenuItem value='round_robin'>Todos contra todos</MenuItem>
                        </CustomTextField>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12 }}>
                <Controller
                    name={`divisions.${index}.description` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            multiline
                            rows={2}
                            label='Descripción'
                            placeholder='Ingrese una descripción de la categoría'
                            error={Boolean(errors.divisions?.[index]?.description)}
                            helperText={errors.divisions?.[index]?.description?.message as string | undefined}
                        />
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                    name={`divisions.${index}.gender` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            select
                            label='Género'
                            error={Boolean(errors.divisions?.[index]?.gender)}
                            helperText={errors.divisions?.[index]?.gender?.message as string | undefined}
                        >
                            <MenuItem value='any'>Mixto</MenuItem>
                            <MenuItem value='male'>Masculino</MenuItem>
                            <MenuItem value='female'>Femenino</MenuItem>
                        </CustomTextField>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                    name={`divisions.${index}.participant_type` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            select
                            label='Tipo de Participante'
                            error={Boolean(errors.divisions?.[index]?.participant_type)}
                            helperText={errors.divisions?.[index]?.participant_type?.message as string | undefined}
                        >
                            <MenuItem value='single'>Sencillos</MenuItem>
                            <MenuItem value='doubles'>Dobles</MenuItem>
                        </CustomTextField>
                    )}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                {/* <Controller
                    name={`divisions.${index}.max_participants` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            type='number'
                            label='Máximo de Participantes'
                            placeholder='Ej: 50'
                            error={Boolean(errors.divisions?.[index]?.max_participants)}
                            helperText={errors.divisions?.[index]?.max_participants?.message as string | ''}
                            value={field.value ?? ''}
                            onChange={event => {
                                const value = event.target.value
                                field.onChange(value === '' ? '' : Number(value))
                            }}
                        />
                    )}
                /> */}
            </Grid>

            {/* <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`divisions.${index}.born_after` as const}
                    control={control}
                    render={({ field }) => (
                        <CustomTextField
                            {...field}
                            fullWidth
                            type='date'
                            label='Nacidos después de'
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.divisions?.[index]?.born_after)}
                            helperText={errors.divisions?.[index]?.born_after?.message as string | undefined}
                        />
                    )}
                />
            </Grid> */}

            <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                    name={`divisions.${index}.is_active` as const}
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Switch checked={field.value} onChange={event => field.onChange(event.target.checked)} />}
                            label='Categoría activa'
                        />
                    )}
                />
            </Grid>
        </Grid>
    )
}

export default TournamentDivisonItem