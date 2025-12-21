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

const DocumentInformation = () => {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <Card>
      <CardHeader title='Información de Documentos' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='document_type'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  select
                  label='Tipo de Documento'
                  error={!!errors.document_type}
                  helperText={errors.document_type?.message}
                >
                  <MenuItem value='passport'>Pasaporte</MenuItem>
                  <MenuItem value='id_card'>Cédula de Identidad</MenuItem>
                  <MenuItem value='driver_license'>Licencia de Conducir</MenuItem>
                  <MenuItem value='other'>Otro</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='document_number'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Número de Documento'
                  placeholder='Ingrese el número de documento'
                  error={!!errors.document_number}
                  helperText={errors.document_number?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DocumentInformation

