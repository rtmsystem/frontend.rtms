import { Chip, Typography } from "@mui/material"
import type { Division } from "@/types/apps/tournament/tournamentTypes"



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


type TournamentDivisionCardProps = {
  division: Division,
  paymentEnabled: boolean,
}

const TournamentDivisionCard = ({ division, paymentEnabled }: TournamentDivisionCardProps) => {
  return (

    <div className='flex w-full flex-col flex-wrap items-start justify-start gap-x-2'>
      {/* <Typography className='font-medium' color='text.primary' variant='h6'>
        {division.name}
      </Typography> */}
      {/* <Typography  className="underline" variant='h6'>$150.000</Typography>
      <Typography variant='h6'>$150.000</Typography> */}

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
    </div >

  )
}

export default TournamentDivisionCard