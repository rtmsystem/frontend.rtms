'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { InferInput } from 'valibot'
import { playerProfileSchema } from '@/valibot/player-profile-schema'

type FormData = InferInput<typeof playerProfileSchema>

const ContactInformation = () => {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <Card>
      <CardHeader title='Información de Contacto' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Ingrese el email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Teléfono'
                  placeholder='Ingrese el teléfono'
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>

          {/* <Grid size={{ xs: 12 }}>
            <Controller
              name='full_address'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Dirección Completa'
                  placeholder='Ingrese la dirección completa'
                  error={!!errors.full_address}
                  helperText={errors.full_address?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='street_number'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Número de Calle'
                  placeholder='Ej: 123'
                  error={!!errors.street_number}
                  helperText={errors.street_number?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='street_location'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Calle'
                  placeholder='Ingrese el nombre de la calle'
                  error={!!errors.street_location}
                  helperText={errors.street_location?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Ciudad'
                  placeholder='Ingrese la ciudad'
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid> */}

          {/* <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='state'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Estado/Provincia'
                  placeholder='Ingrese el estado o provincia'
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='País'
                  placeholder='Ingrese el país'
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='postal_code'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Código Postal'
                  placeholder='Ingrese el código postal'
                  error={!!errors.postal_code}
                  helperText={errors.postal_code?.message}
                />
              )}
            />
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ContactInformation

