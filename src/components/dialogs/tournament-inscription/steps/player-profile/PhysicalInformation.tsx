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

const PhysicalInformation = () => {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <Card>
      <CardHeader title='Información Física' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name='height_cm'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Estatura (cm)'
                  placeholder='Ej: 175'
                  error={!!errors.height_cm}
                  helperText={errors.height_cm?.message}
                  onChange={event => field.onChange(event.target.value ? Number(event.target.value) : null)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name='weight_kg'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Peso (kg)'
                  placeholder='Ej: 70'
                  error={!!errors.weight_kg}
                  helperText={errors.weight_kg?.message}
                  onChange={event => field.onChange(event.target.value ? Number(event.target.value) : null)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name='handedness'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  select
                  label='Mano Dominante'
                  error={!!errors.handedness}
                  helperText={errors.handedness?.message}
                >
                  <MenuItem value='right_handed'>Derecha</MenuItem>
                  <MenuItem value='left_handed'>Izquierda</MenuItem>
                  <MenuItem value='ambidextrous'>Ambidiestro</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Controller
              name='shirt_size'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  select
                  label='Talla de Camiseta'
                  error={!!errors.shirt_size}
                  helperText={errors.shirt_size?.message}
                >
                  <MenuItem value='XS'>XS</MenuItem>
                  <MenuItem value='S'>S</MenuItem>
                  <MenuItem value='M'>M</MenuItem>
                  <MenuItem value='L'>L</MenuItem>
                  <MenuItem value='XL'>XL</MenuItem>
                  <MenuItem value='XXL'>XXL</MenuItem>
                  <MenuItem value='XXXL'>XXXL</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PhysicalInformation

