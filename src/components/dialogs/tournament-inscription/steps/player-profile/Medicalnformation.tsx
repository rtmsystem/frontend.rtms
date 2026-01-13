'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { InferInput } from 'valibot'
import { playerProfileSchema } from '@/valibot/player-profile-schema'

type FormData = InferInput<typeof playerProfileSchema>

const MedicalInformation = () => {
    const { control, formState: { errors } } = useFormContext<FormData>()

    return (
        <Card>
            <CardHeader title='Información Médica' />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name='health_insurance'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Seguro / EPS'
                                    placeholder='Ej: Sanitas'
                                    error={!!errors.health_insurance}
                                    helperText={errors.health_insurance?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name='blood_type'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    select
                                    label='Tipo de Sangre'
                                    error={!!errors.blood_type}
                                    helperText={errors.blood_type?.message}
                                >
                                    <MenuItem value='A+'>A+</MenuItem>
                                    <MenuItem value='A-'>A-</MenuItem>
                                    <MenuItem value='B+'>B+</MenuItem>
                                    <MenuItem value='B-'>B-</MenuItem>
                                    <MenuItem value='AB+'>AB+</MenuItem>
                                    <MenuItem value='AB-'>AB-</MenuItem>
                                    <MenuItem value='O+'>O+</MenuItem>
                                    <MenuItem value='O-'>O-</MenuItem>
                                </CustomTextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 12 }}>
                        <Controller
                            name='medical_conditions'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label='Condición Médica'
                                    placeholder='Alergias, condiciones preexistentes, etc.'
                                    error={!!errors.medical_conditions}
                                    helperText={errors.medical_conditions?.message}
                                    value={field.value || ''} // Ensure it's not null for controlled input if schema allows null
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MedicalInformation
