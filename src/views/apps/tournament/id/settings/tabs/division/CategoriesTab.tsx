'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import type { TimelineProps } from '@mui/lab/Timeline'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomAvatar from '@core/components/mui/Avatar'
import CreateDivisionForm from './CreateDivisionForm'

// Type Imports
import type { Division } from '@/types/apps/tournament/tournamentTypes'

// Hook Imports
import { useTournament } from '@/contexts/TournamentContext'
import { useAuthToken } from '@/hooks/useAuthToken'
import TournamentDivisions from '../../../home/TournamentDivisions'

type Props = {
  divisions: Division[]
  tournamentId: number
}

const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const CategoriesTab = ({ divisions, tournamentId }: Props) => {
  // States
  const [editingDivisionId, setEditingDivisionId] = useState<number | null>(null)
  const [isCreatingDivision, setIsCreatingDivision] = useState(false)

  // Hooks
  const { tournament, updateTournament } = useTournament()
  const { fetchApi } = useAuthToken()

  // Handler para refrescar las divisiones después de crear/editar
  const refreshDivisions = async () => {
    try {
      const response = await fetchApi(`/tournaments/${tournamentId}/`)
      const result = await response.json()
      if (response.ok && result.data && tournament) {
        updateTournament({ ...tournament, divisions: result.data.divisions })
      }
    } catch (error) {
      console.error('Error al refrescar divisiones:', error)
    }
  }

  // Obtener la división que se está editando
  const editingDivision = editingDivisionId
    ? divisions.find(div => div.id === editingDivisionId)
    : undefined




  // Helper functions
  const getGenderLabel = (gender: string) => {
    const labels: Record<string, string> = {
      male: 'Masculino',
      female: 'Femenino',
      any: 'Mixto'
    }
    return labels[gender] || gender
  }

  const getParticipantTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      single: 'Sencillos',
      doubles: 'Dobles'
    }
    return labels[type] || type
  }

  const getFormatLabel = (format: string) => {
    const labels: Record<string, string> = {
      knockout: 'Eliminación directa',
      league: 'Liga',
      round_robin: 'Todos contra todos',
      round_robin_knockout: 'Grupos + Eliminación directa'
    }
    return labels[format] || format
  }

  const getStatusColor = (isActive: boolean, isFull: boolean) => {
    if (!isActive) return 'error'
    if (isFull) return 'warning'
    return 'success'
  }

  const getStatusLabel = (isActive: boolean, isFull: boolean) => {
    if (!isActive) return 'Inactiva'
    if (isFull) return 'Completa'
    return 'Activa'
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader
            avatar={
              <CustomAvatar skin='light' color='primary' variant='rounded' size={50}>
                <i className='tabler-list-details text-3xl' />
              </CustomAvatar>
            }
            title='Categorías del Torneo'
            titleTypographyProps={{ variant: 'h5' }}
            subheader={`${divisions.length} categoría${divisions.length !== 1 ? 's' : ''} registrada${divisions.length !== 1 ? 's' : ''}`}
            action={
              <Button
                variant='contained'
                size='small'
                startIcon={<i className='tabler-plus' />}
                onClick={() => setIsCreatingDivision(true)}
                disabled={isCreatingDivision || !!editingDivision}
              >
                Agregar Categoría
              </Button>
            }
            sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
          />
          <CardContent className='flex flex-col gap-6 pbe-5'>

            {(isCreatingDivision || editingDivision) && (
              <div className='mbe-4'>
                <CreateDivisionForm
                  tournamentId={tournamentId}
                  division={editingDivision}
                  onCancel={() => {
                    setIsCreatingDivision(false)
                    setEditingDivisionId(null)
                  }}
                  onSuccess={() => {
                    setIsCreatingDivision(false)
                    setEditingDivisionId(null)
                    refreshDivisions()
                  }}
                />
              </div>
            )}
            {divisions.length > 0 ? (
              <TournamentDivisions
                tournament={tournament}
                showEditIcon={true}
                onEdit={(divisionId) => setEditingDivisionId(divisionId)}
                showActiveStatus={true}
              />
            ) : (
              <div className='flex flex-col items-center justify-center gap-4 p-12'>
                <CustomAvatar skin='light' color='primary' variant='rounded' size={80}>
                  <i className='tabler-list-details text-4xl' />
                </CustomAvatar>
                <Typography variant='h6' color='text.secondary'>
                  No hay categorías registradas
                </Typography>
                <Typography variant='body2' color='text.secondary' className='text-center'>
                  Agrega una categoría para comenzar a organizar el torneo
                </Typography>
                <Button
                  variant='contained'
                  startIcon={<i className='tabler-plus' />}
                  onClick={() => setIsCreatingDivision(true)}
                  disabled={isCreatingDivision || !!editingDivision}
                >
                  Agregar Primera Categoría
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CategoriesTab

