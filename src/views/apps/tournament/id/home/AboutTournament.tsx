import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Tournament } from '@/types/apps/tournament/tournamentTypes'


const AboutTournament = ({ tournament }: { tournament: Tournament }) => {
    return (
        <Card>
          <CardContent>
            <Typography variant='h5' className='mbe-2'>
             {tournament.name}
            </Typography>
            <Typography color='text.secondary'>
              {tournament.description}
            </Typography>
          </CardContent>
        </Card>
      )
}

export default AboutTournament