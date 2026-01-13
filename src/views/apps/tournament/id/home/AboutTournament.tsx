import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Tournament } from '@/types/apps/tournament/tournamentTypes'
import Box from '@mui/material/Box'


const AboutTournament = ({ tournament }: { tournament: Tournament }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' className='mbe-2'>
          {tournament.name}
        </Typography>
        <Box
          dangerouslySetInnerHTML={{ __html: tournament.description }}
        >

        </Box>



      </CardContent>
    </Card>
  )
}

export default AboutTournament