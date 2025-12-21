'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Component Imports
import TournamentDivisions from './TournamentDivisions'
import { Tournament } from '@/types/apps/tournament/tournamentTypes'

const TournamentDivisionCard = ({ tournament }: { tournament: Tournament }) => {
  return (
    <Card>
      <CardHeader
        avatar={<i className='tabler-list-details text-xl' />}
        title='Categorías participantes'
        titleTypographyProps={{ variant: 'h5' }}
        // action={
        //   <CustomIconButton color='primary' size='small'>
        //     <i className='tabler-edit' />
        //   </CustomIconButton>
        // }
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
      />
      <CardContent className='flex flex-col gap-6 pbe-5'>
        <TournamentDivisions tournament={tournament} onlyActive={true} />
      </CardContent>
    </Card>
  )
}

export default TournamentDivisionCard