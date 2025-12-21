
'use client'

// MUI Imports
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import type { TimelineProps } from '@mui/lab/Timeline'

// Components Imports
import Chip from '@mui/material/Chip'
import CustomIconButton from '@/@core/components/mui/IconButton'
import { Tournament } from '@/types/apps/tournament/tournamentTypes'

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

interface TournamentDivisionsProps {
  tournament: Tournament
  showEditIcon?: boolean
  onEdit?: (divisionId: number) => void
  showActiveStatus?: boolean
  onlyActive?: boolean
}

const TournamenteDivisions = ({ tournament, showEditIcon = false, onEdit, showActiveStatus = false, onlyActive = false }: TournamentDivisionsProps) => {

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
      double_slash: 'Doble eliminación',
      round_robin: 'Todos contra todos'
    }
    return labels[format] || format
  }

  // Filtrar divisiones activas si onlyActive es true
  const divisionsToShow = onlyActive 
    ? tournament.divisions.filter(division => division.is_active)
    : tournament.divisions

  return (
    <Timeline>
      {
        divisionsToShow.map((division) => (
          <TimelineItem key={division?.id}>
            <TimelineSeparator>
              <TimelineDot color={division.is_active ? 'primary' : 'error'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2'>
                <div className='flex items-center gap-3'>
                <Typography className='font-medium' color='text.primary' variant='h6'>
                  {division.name}
                </Typography>
                {/* {showActiveStatus && (
                  <Chip
                    icon={<i className={division.is_active ? 'tabler-check text-base' : 'tabler-x text-base'} />}
                    label={division.is_active ? 'Activa' : 'Inactiva'}
                    color={division.is_active ? 'success' : 'error'}
                    variant='outlined'
                    size='small'
                  />
                )} */}
                </div>
               
                {showEditIcon && onEdit && division?.id && (
                  <CustomIconButton
                    color='primary'
                    size='small'
                    onClick={() => onEdit(division.id)}
                  >
                    <i className='tabler-edit' />
                  </CustomIconButton>
                )}
                {/* <Typography variant='h6'>$150.000</Typography> */}
              </div>
              <div className='flex flex-wrap items-center gap-2 mbe-2'>
                <Chip
                  icon={<i className='tabler-gender-bigender text-base' />}
                  label={`${getGenderLabel(division.gender)} | ${getParticipantTypeLabel(division.participant_type)}`}
                  variant='outlined'
                  size='small'
                />
                <Chip
                  icon={<i className='tabler-tournament text-base' />}
                  label={getFormatLabel(division.format)}
                  variant='outlined'
                  size='small'
                />
                
              </div>
              <Typography variant='body2' className='mbe-2' color='text.secondary'>{division.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))
      }
    </Timeline>
  )
}

export default TournamenteDivisions