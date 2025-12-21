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

const SocialMedia = () => {
  const { control, formState: { errors } } = useFormContext<FormData>()

  return (
    <Card>
      <CardHeader title='Redes Sociales' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='instagram_url'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='url'
                  label='Instagram'
                  placeholder='https://instagram.com/usuario'
                  error={!!errors.instagram_url}
                  helperText={errors.instagram_url?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='facebook_url'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='url'
                  label='Facebook'
                  placeholder='https://facebook.com/usuario'
                  error={!!errors.facebook_url}
                  helperText={errors.facebook_url?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name='linkedin_url'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='url'
                  label='LinkedIn'
                  placeholder='https://linkedin.com/in/usuario'
                  error={!!errors.linkedin_url}
                  helperText={errors.linkedin_url?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SocialMedia

