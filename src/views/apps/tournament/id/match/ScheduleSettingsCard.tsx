import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import LoadingButton from '@mui/lab/LoadingButton'
import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, minLength, number, minValue } from 'valibot'
import type { InferInput } from 'valibot'

const schema = object({
    start_date: pipe(string(), minLength(1, 'Este campo es requerido')),
    end_date: pipe(string(), minLength(1, 'Este campo es requerido')),
    start_hour: pipe(string(), minLength(1, 'Este campo es requerido')),
    end_hour: pipe(string(), minLength(1, 'Este campo es requerido')),
    available_courts: pipe(number(), minValue(1, 'Debe haber al menos 1 cancha'))
})

type FormData = InferInput<typeof schema>

type ScheduleSettingsCardProps = {
    onSchedule: (data: FormData) => Promise<void>
    isLoading: boolean
}

const ScheduleSettingsCard = ({ onSchedule, isLoading }: ScheduleSettingsCardProps) => {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: valibotResolver(schema),
        defaultValues: {
            start_date: '',
            end_date: '',
            start_hour: '',
            end_hour: '',
            available_courts: 1
        }
    })

    const onSubmit = (data: FormData) => {
        onSchedule(data)
    }

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <div className="flex flex-col items-center gap-3 text-center mb-6">
                    <Typography variant='h5' fontWeight={600}>
                        Programar Partidos
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Configura el rango de fechas, horario y canchas disponibles.
                    </Typography>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name='start_date'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <AppReactDatepicker
                                        selected={value ? new Date(value) : null}
                                        onChange={(date: Date | null) => onChange(date ? date.toISOString().split('T')[0] : '')}
                                        placeholderText='YYYY-MM-DD'
                                        dateFormat="yyyy-MM-dd"
                                        customInput={
                                            <CustomTextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label='Fecha de Inicio'
                                                error={!!errors.start_date}
                                                helperText={errors.start_date?.message}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name='end_date'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <AppReactDatepicker
                                        selected={value ? new Date(value) : null}
                                        onChange={(date: Date | null) => onChange(date ? date.toISOString().split('T')[0] : '')}
                                        placeholderText='YYYY-MM-DD'
                                        dateFormat="yyyy-MM-dd"
                                        customInput={
                                            <CustomTextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label='Fecha Fin'
                                                error={!!errors.end_date}
                                                helperText={errors.end_date?.message}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name='start_hour'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <AppReactDatepicker
                                        selected={value ? new Date(`2000-01-01T${value}`) : null}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        onChange={(date: Date | null) => {
                                            if (date) {
                                                const hours = date.getHours().toString().padStart(2, '0')
                                                const minutes = date.getMinutes().toString().padStart(2, '0')
                                                onChange(`${hours}:${minutes}`)
                                            } else {
                                                onChange('')
                                            }
                                        }}
                                        customInput={
                                            <CustomTextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label='Hora Inicio'
                                                error={!!errors.start_hour}
                                                helperText={errors.start_hour?.message}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Controller
                                name='end_hour'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <AppReactDatepicker
                                        selected={value ? new Date(`2000-01-01T${value}`) : null}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        timeCaption="Time"
                                        dateFormat="HH:mm"
                                        onChange={(date: Date | null) => {
                                            if (date) {
                                                const hours = date.getHours().toString().padStart(2, '0')
                                                const minutes = date.getMinutes().toString().padStart(2, '0')
                                                onChange(`${hours}:${minutes}`)
                                            } else {
                                                onChange('')
                                            }
                                        }}
                                        customInput={
                                            <CustomTextField
                                                value={value}
                                                onChange={onChange}
                                                fullWidth
                                                label='Hora Fin'
                                                error={!!errors.end_hour}
                                                helperText={errors.end_hour?.message}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Controller
                                name='available_courts'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <CustomTextField
                                        type='number'
                                        value={value}
                                        onChange={(e) => onChange(Number(e.target.value))}
                                        fullWidth
                                        label='Canchas Disponibles'
                                        error={!!errors.available_courts}
                                        helperText={errors.available_courts?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    {/* <div className="flex justify-center pt-2 mt-2">
                        <LoadingButton
                            loading={isLoading}
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            fullWidth
                        >
                            Programar
                        </LoadingButton>
                    </div> */}
                </form>
            </CardContent>
        </Card>
    )
}

export default ScheduleSettingsCard
