import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import CustomIconButton from '@core/components/mui/IconButton'
import { Tournament } from '@/types/apps/tournament/tournamentTypes'

const TournamentContact = ({ tournament }: { tournament: Tournament }) => {
    return (
        <Card className='bg-primary'>

            <CardContent className='flex flex-col gap-2 '>
                <div className='flex items-center gap-2 mbe-4 justify-between'>
                    <Typography variant='h5' className='text-white'>
                        Información del contacto
                    </Typography>
                    {/* <CustomIconButton className='text-white' size='small'>
                        <i className='tabler-edit' />
                    </CustomIconButton> */}
                </div>
                <div className='flex items-center gap-2.5'>
                    <Avatar
                        alt={''}
                        src={tournament.organization_logo || ''}

                        className='cursor-pointer bs-[24px] is-[24px]'
                    />
                    <Typography variant='h6' className='text-white'>{tournament.contact_name}</Typography>
                </div>
                <div className='flex items-center gap-1.5'>
                    <i className='tabler-phone-filled !text-base text-white' />
                    <Typography variant='subtitle1' className='text-white'>
                        {tournament.contact_phone}
                    </Typography>

                </div>
                <div className='flex items-center gap-1.5'>
                    <i className='tabler-mail-filled !text-base text-white' />
                    <Typography variant='subtitle1' className='text-white'>
                        {tournament.contact_email}
                    </Typography>

                </div>
                <div className='flex items-center gap-1.5'>
                    <i className='tabler-map-pin-filled !text-base text-white' />
                    <Typography variant='subtitle1' className='text-white'>
                        {`${tournament.city}, ${tournament.country}`}
                    </Typography>

                </div>

            </CardContent>
        </Card>
    )
}

export default TournamentContact