'use client'

import { Controller, useFormContext } from 'react-hook-form'
import CustomTextField from '@/@core/components/mui/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid2'
import TournamentSchema from '@/valibot/tournament-schema'
import { InferInput } from 'valibot'

type FormData = InferInput<typeof TournamentSchema>

const TournamentBasicInformation = () => {

  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <Card>
      <CardHeader title='Información General' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Nombre del Torneo'
                  placeholder='Ingrese el nombre del torneo'
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  multiline
                  rows={4}
                  label='Acerca del Torneo'
                  placeholder='Escribe una algo acerca del torneo'
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TournamentBasicInformation