'use client'

// React Imports
import React, { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import DivisionSchema from '@/valibot/division-schema'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Type Imports
import type { Division } from '@/types/apps/tournament/tournamentTypes'

// Hook Imports
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import { Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

type Props = {
  tournamentId: number
  division?: Division
  onCancel: () => void
  onSuccess: () => void
}

type FormData = InferInput<typeof DivisionSchema>

const CreateDivisionForm = ({ tournamentId, division, onCancel, onSuccess }: Props) => {
  // States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Hooks
  const { fetchApi } = useAuthToken()

  const isEditMode = !!division

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: valibotResolver(DivisionSchema),
    defaultValues: {
      name: division?.name || '',
      description: division?.description || '',
      format: division?.format || '',
      max_participants: division?.max_participants || undefined,
      gender: division?.gender || '',
      participant_type: division?.participant_type || '',
      born_after: division?.born_after || null,
      is_active: division?.is_active ?? true
    }
  })

  // Handlers
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const payload = {
        name: data.name,
        description: data.description || '',
        format: data.format,
        max_participants: data.max_participants || 1,
        gender: data.gender,
        participant_type: data.participant_type,
        born_after: data.born_after || null,
        is_active: data.is_active
      }

      const url = isEditMode
        ? `/tournaments/${tournamentId}/divisions/${division!.id}/`
        : `/tournaments/${tournamentId}/divisions/`

      const method = isEditMode ? 'PATCH' : 'POST'

      const response = await fetchApi(url, {
        method,
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast.success(isEditMode ? 'Categoría actualizada exitosamente' : 'Categoría creada exitosamente')
        reset()
        onSuccess()
      } else {
        const errorData = await response.json()
        setSubmitError(
          errorData.message ||
          errorData.detail ||
          (isEditMode ? 'Error al actualizar la categoría' : 'Error al crear la categoría')
        )
      }
    } catch (error) {
      setSubmitError('Error al conectar con el servidor')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!division) return

    setIsDeleting(true)
    setSubmitError(null)

    try {
      const response = await fetchApi(`/tournaments/${tournamentId}/divisions/${division.id}/`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Categoría eliminada exitosamente')
        setDeleteDialogOpen(false)
        onSuccess()
      } else {
        const errorData = await response.json()
        setSubmitError(errorData.message || errorData.detail || 'Error al eliminar la categoría')
      }
    } catch (error) {
      setSubmitError('Error al conectar con el servidor')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Card className='mbe-4'>
        <CardContent>
          <div className='flex items-center gap-4 mbe-6'>
            <div>
              <Typography variant='h5'>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</Typography>
              <Typography variant='body2'>
                {isEditMode ? 'Modifica la información de la categoría' : 'Agrega una nueva categoría al torneo'}
              </Typography>
            </div>
          </div>

          <Divider className='mbe-6' />

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            {submitError && (
              <Alert severity='error' onClose={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            )}

            <div className='flex flex-col gap-4'>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Nombre de la Categoría'
                        placeholder='Ej: Categoría A'
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='format'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        select
                        label='Formato'
                        error={!!errors.format}
                        helperText={errors.format?.message}
                      >
                        <MenuItem value='knockout'>Eliminación directa</MenuItem>
                        {/* <MenuItem value='league'>Liga</MenuItem> */}
                        {/* <MenuItem value='round_robin'>Todos contra todos</MenuItem> */}
                        <MenuItem value='round_robin_knockout'>Grupos + Eliminación directa</MenuItem>
                      </CustomTextField>
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
                        rows={3}
                        label='Descripción'
                        placeholder='Ingrese una descripción de la categoría'
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        select
                        label='Género'
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                      >
                        <MenuItem value='any'>Mixto</MenuItem>
                        <MenuItem value='male'>Masculino</MenuItem>
                        <MenuItem value='female'>Femenino</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name='participant_type'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        select
                        label='Tipo de Participante'
                        error={!!errors.participant_type}
                        helperText={errors.participant_type?.message}
                      >
                        <MenuItem value='single'>Sencillos</MenuItem>
                        <MenuItem value='doubles'>Dobles</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  {/* <Controller
                  name='max_participants'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='number'
                      label='Máximo de Participantes'
                      placeholder='Ej: 50'
                      error={!!errors.max_participants}
                      helperText={errors.max_participants?.message}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  )}
                /> */}
                </Grid>

                {/* <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name='born_after'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='date'
                      label='Nacidos después de'
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.born_after}
                      helperText={errors.born_after?.message}
                    />
                  )}
                />
              </Grid> */}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name='is_active'
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={event => field.onChange(event.target.checked)} />}
                        label='Categoría activa'
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </div>

            <Divider />

            <div className='flex justify-between flex-wrap gap-4'>
              {isEditMode && (
                <Button
                  variant='outlined'
                  color='error'
                  type='button'
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={isSubmitting || isDeleting}
                >
                  Eliminar
                </Button>
              )}
              <div className='flex gap-4 ml-auto'>
                <Button variant='outlined' type='button' onClick={onCancel} disabled={isSubmitting || isDeleting}>
                  Cancelar
                </Button>
                <Button variant='contained' type='submit' disabled={isSubmitting || isDeleting}>
                  {isSubmitting ? (isEditMode ? 'Guardando...' : 'Creando...') : isEditMode ? 'Guardar Cambios' : 'Crear Categoría'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar la categoría &quot;{division?.name}&quot;? Esta acción eliminará también todos los jugadores, partidos y estadísticas asociados a esta categoría. Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color='error' variant='contained' disabled={isDeleting}>
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateDivisionForm

