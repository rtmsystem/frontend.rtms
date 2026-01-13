'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, string, pipe, minLength, email, optional, nullable } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import PaymentDescriptionEditor from './tabs/payments/PaymentDescriptionEditor'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'

// Hook Imports
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import { useTournament } from '@/contexts/TournamentContext'

type Props = {
  tournament?: Tournament
}

// Schema de validación
const schema = object({
  name: pipe(string(), minLength(1, 'Este campo es requerido')),
  description: optional(string()),
  contact_name: pipe(string(), minLength(1, 'Este campo es requerido')),
  contact_phone: pipe(string(), minLength(1, 'Este campo es requerido')),
  contact_email: pipe(string(), minLength(1, 'Este campo es requerido'), email('Email inválido')),
  start_date: pipe(string(), minLength(1, 'Este campo es requerido')),
  end_date: pipe(string(), minLength(1, 'Este campo es requerido')),
  registration_deadline: pipe(string(), minLength(1, 'Este campo es requerido')),
  address: pipe(string(), minLength(1, 'Este campo es requerido')),
  street_number: pipe(string(), minLength(1, 'Este campo es requerido')),
  street_location: pipe(string(), minLength(1, 'Este campo es requerido')),
  city: pipe(string(), minLength(1, 'Este campo es requerido')),
  state: optional(nullable(string())),
  country: pipe(string(), minLength(1, 'Este campo es requerido')),
  postal_code: optional(nullable(string()))
})

type FormData = InferInput<typeof schema>

const BasicInformationForm = ({ tournament }: Props) => {
  // Hooks
  const { fetchApi } = useAuthToken()
  const { tournament: contextTournament, updateTournament } = useTournament()
  // Usar el torneo del contexto si está disponible, sino usar la prop
  const currentTournament = contextTournament || tournament

  // States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: tournament?.name || '',
      description: tournament?.description || '',
      contact_name: tournament?.contact_name || '',
      contact_phone: tournament?.contact_phone || '',
      contact_email: tournament?.contact_email || '',
      start_date: tournament?.start_date ? new Date(tournament.start_date).toISOString().split('T')[0] : '',
      end_date: tournament?.end_date ? new Date(tournament.end_date).toISOString().split('T')[0] : '',
      registration_deadline: tournament?.registration_deadline
        ? new Date(tournament.registration_deadline).toISOString().split('T')[0]
        : '',
      address: tournament?.address || '',
      street_number: tournament?.street_number || '',
      street_location: tournament?.street_location || '',
      city: tournament?.city || '',
      state: tournament?.state || null,
      country: tournament?.country || '',
      postal_code: tournament?.postal_code || null
    }
  })

  // Reset form when tournament changes
  useEffect(() => {
    if (tournament) {
      reset({
        name: tournament.name || '',
        description: tournament.description || '',
        contact_name: tournament.contact_name || '',
        contact_phone: tournament.contact_phone || '',
        contact_email: tournament.contact_email || '',
        start_date: tournament.start_date ? new Date(tournament.start_date).toISOString().split('T')[0] : '',
        end_date: tournament.end_date ? new Date(tournament.end_date).toISOString().split('T')[0] : '',
        registration_deadline: tournament.registration_deadline
          ? new Date(tournament.registration_deadline).toISOString().split('T')[0]
          : '',
        address: tournament.address || '',
        street_number: tournament.street_number || '',
        street_location: tournament.street_location || '',
        city: tournament.city || '',
        state: tournament.state || null,
        country: tournament.country || '',
        postal_code: tournament.postal_code || null
      })
    }
  }, [tournament, reset])

  // Handlers
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const response = await fetchApi(
        `/tournaments/${tournament?.id}/`,
        {
          method: 'PATCH',
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        const result = await response.json()
        // Hacer merge del torneo actual con los datos actualizados para mantener todas las propiedades
        if (result.data && currentTournament) {
          updateTournament({ ...currentTournament, ...result.data })
        } else if (result.data) {
          updateTournament(result.data)
        }
        toast.success('Torneo actualizado exitosamente')

      } else {
        const errorData = await response.json()
        setSubmitError(errorData.message || 'Error al actualizar el torneo')
      }
    } catch (error) {
      setSubmitError('Error al conectar con el servidor')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <div className='flex items-center gap-4 mbe-6'>
              <CustomAvatar skin='light' color='primary' variant='rounded' size={50}>
                <i className='tabler-info-circle text-3xl' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>Información Básica del Torneo</Typography>
                <Typography variant='body2'>Actualiza la información general del torneo</Typography>
              </div>
            </div>

            <Divider className='mbe-6' />

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
              {submitError && (
                <Alert severity='error' onClose={() => setSubmitError(null)}>
                  {submitError}
                </Alert>
              )}

              {submitSuccess && (
                <Alert severity='success' onClose={() => setSubmitSuccess(false)}>
                  Torneo actualizado exitosamente
                </Alert>
              )}

              {/* Información General */}
              <div className='flex flex-col gap-4'>
                <Typography variant='h6'>Información General</Typography>

                <Grid container spacing={4}>
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
                      render={({ field: { value, onChange } }) => (
                        <PaymentDescriptionEditor
                          value={value || ''}
                          onChange={onChange}
                          placeholder='Ingrese una descripción del torneo'
                          error={!!errors.description}
                          helperText={errors.description?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>

              <Divider />

              {/* Información de Contacto */}
              <div className='flex flex-col gap-4'>
                <Typography variant='h6'>Información de Contacto</Typography>

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
              </div>

              <Divider />

              {/* Fechas */}
              <div className='flex flex-col gap-4'>
                <Typography variant='h6'>Fechas del Torneo</Typography>

                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='start_date'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          type='date'
                          label='Fecha de Inicio'
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.start_date}
                          helperText={errors.start_date?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='end_date'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          type='date'
                          label='Fecha de Finalización'
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.end_date}
                          helperText={errors.end_date?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='registration_deadline'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          type='date'
                          label='Fecha Límite de Registro'
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.registration_deadline}
                          helperText={errors.registration_deadline?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>

              <Divider />

              {/* Dirección */}
              <div className='flex flex-col gap-4'>
                <Typography variant='h6'>Dirección</Typography>

                <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name='address'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Dirección Completa'
                          placeholder='Ingrese la dirección completa'
                          error={!!errors.address}
                          helperText={errors.address?.message}
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
                          placeholder='Ej: 12'
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
                          label='Calle/Localización'
                          placeholder='Ej: 34'
                          error={!!errors.street_location}
                          helperText={errors.street_location?.message}
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
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='state'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Estado/Departamento'
                          placeholder='Ingrese el estado o departamento'
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
                </Grid>
              </div>

              <Divider />

              {/* Botones de Acción */}
              <div className='flex justify-end gap-4'>
                <Button variant='contained' type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BasicInformationForm


