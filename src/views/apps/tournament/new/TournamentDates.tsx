import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CustomTextField from '@/@core/components/mui/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import TournamentSchema from '@/valibot/tournament-schema'
import { InferInput, value } from 'valibot'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type FormData = InferInput<typeof TournamentSchema>

const TournamentDates = () => {
    const { control, formState: { errors } } = useFormContext<FormData>()
    return (
        <Card>
            <CardHeader title='Fechas del Torneo' />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name='start_date'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <AppReactDatepicker
                                    selected={value ? new Date(value) : null}
                                    showYearDropdown
                                    showMonthDropdown
                                    onChange={onChange}
                                    placeholderText='MM/DD/YYYY'
                                    customInput={
                                        <CustomTextField
                                            value={value}
                                            onChange={onChange}
                                            fullWidth
                                            label='Fecha de Inicio'
                                            {...(errors.start_date && { error: true, helperText: 'Este campo es requerido' })}
                                        />
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name='end_date'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <AppReactDatepicker
                                    selected={value ? new Date(value) : null}
                                    showYearDropdown
                                    showMonthDropdown
                                    onChange={onChange}
                                    placeholderText='MM/DD/YYYY'
                                    customInput={
                                        <CustomTextField
                                            value={value}
                                            onChange={onChange}
                                            fullWidth
                                            label='Fecha de Finalización'
                                            {...(errors.end_date && { error: true, helperText: 'Este campo es requerido' })}
                                        />
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name='registration_deadline'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <AppReactDatepicker
                                    selected={value ? new Date(value) : null}
                                    showYearDropdown
                                    showMonthDropdown
                                    onChange={onChange}
                                    placeholderText='MM/DD/YYYY'
                                    customInput={
                                        <CustomTextField
                                            value={value}
                                            onChange={onChange}
                                            fullWidth
                                            label='Fecha Límite de Registro'
                                            {...(errors.registration_deadline && { error: true, helperText: 'Este campo es requerido' })}
                                        />
                                    }
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TournamentDates