import SimpleHorizontalWithBorder from '@/components/card-statistics/SimpleHorizontalWithBorder'
import { Tournament } from '@/types/apps/tournament/tournamentTypes'
import { CardSimpleHorizontalWithBorderProps } from '@/types/pages/widgetTypes'
import Grid from '@mui/material/Grid2'
import { formatDate } from '@/utils/string'


const InformationCard = ({ tournament }: { tournament: Tournament }) =>  {
    
    const cardData:CardSimpleHorizontalWithBorderProps[] = [
        {
            title: formatDate(tournament.start_date),
            description: 'Fecha inicio',
            avatarIcon: 'tabler-clock-play',
            color: 'success'
        },
        {
            title: formatDate(tournament.end_date, 'DD MMM YYYY'),
            description: 'Fecha final',
            avatarIcon: 'tabler-clock-stop',
            color: 'error'
        },
        {
            title: formatDate(tournament.registration_deadline, 'DD MMM YYYY'),
            description: 'Registros hasta',
            avatarIcon: 'tabler-clock-x',
            color: 'warning'
        },
        {
            title: tournament.city,
            description: tournament.country,
            avatarIcon: 'tabler-map-pin',
            color: 'primary'
        }
    ]

    return (
        cardData && (
          <Grid container spacing={6}>
            {cardData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <SimpleHorizontalWithBorder {...item} />
              </Grid>
            ))}
          </Grid>
        )
      )
    }


export default InformationCard