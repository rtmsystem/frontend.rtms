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

const EmergencyContact = () => {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <Card>
      <CardHeader title='Contacto de Emergencia' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='emergency_contact_first_name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Nombre'
                  placeholder='Ingrese el nombre'
                  error={!!errors.emergency_contact_first_name}
                  helperText={errors.emergency_contact_first_name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='emergency_contact_last_name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Apellido'
                  placeholder='Ingrese el apellido'
                  error={!!errors.emergency_contact_last_name}
                  helperText={errors.emergency_contact_last_name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='emergency_contact_phone'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Teléfono'
                  placeholder='Ingrese el teléfono'
                  error={!!errors.emergency_contact_phone}
                  helperText={errors.emergency_contact_phone?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='emergency_contact_relationship'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  select
                  label='Relación'
                  error={!!errors.emergency_contact_relationship}
                  helperText={errors.emergency_contact_relationship?.message}
                >
                  <MenuItem value='parent'>Padre/Madre</MenuItem>
                  <MenuItem value='spouse'>Cónyuge</MenuItem>
                  <MenuItem value='sibling'>Hermano/Hermana</MenuItem>
                  <MenuItem value='child'>Hijo/Hija</MenuItem>
                  <MenuItem value='friend'>Amigo/Amiga</MenuItem>
                  <MenuItem value='other'>Otro</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EmergencyContact

