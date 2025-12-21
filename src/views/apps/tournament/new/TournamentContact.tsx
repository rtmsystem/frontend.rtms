'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import TournamentSchema from '@/valibot/tournament-schema'
import { InferInput } from 'valibot'


type FormData = InferInput<typeof TournamentSchema>

const TournamentContact = () => {
    const { control, formState: { errors } } = useFormContext<FormData>()
   
    return (
        <Card>
            <CardHeader title='Información del Contacto' />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name='contact_name'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Nombre de Contacto'
                                    placeholder='Ingrese el nombre del contacto'
                                    error={!!errors.contact_name}
                                    helperText={errors.contact_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name='contact_phone'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Teléfono de Contacto'
                                    placeholder='Ingrese el teléfono'
                                    error={!!errors.contact_phone}
                                    helperText={errors.contact_phone?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name='contact_email'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    type='email'
                                    label='Email de Contacto'
                                    placeholder='Ingrese el email'
                                    error={!!errors.contact_email}
                                    helperText={errors.contact_email?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TournamentContact