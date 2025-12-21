import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import { Tournament } from "@/types/apps/tournament/tournamentTypes"
import Chip from "@/@core/components/mui/Chip"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import { formatDate } from "@/utils/string"
import Button from "@mui/material/Button"
import { useRouter } from 'next/navigation'
import Avatar from "@mui/material/Avatar"
import ActionArea from "@mui/material/CardActionArea"

type TournamentCardProps = {
    tournament: Tournament
}


const InfoRow = styled(Box)(({ theme }) => ({
    display: 'flex flex-row',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    '& i': {
        fontSize: '1.25rem'
    }
}))
const TournamentItemCard = ({ tournament }: TournamentCardProps) => {

    const router = useRouter()

    const handleCardClick = () => {
        router.push(`/tournaments/${tournament.id}/home`)
    }


    return (
        <Card className='cursor-pointer hover:scale-105 transition-all duration-300'>
            <ActionArea
            onClick={handleCardClick}
            >
                <CardMedia image={tournament.banner || 'https://res.cloudinary.com/dd7dzmgeg/image/upload/v1761687717/Group_6_zfjjy7.png'} className='bs-[150px]' >
                {
                    tournament.status === 'draft' && (
                        <Chip
                        icon={<i className='tabler-alert-triangle' />}
                        label={tournament.status.toUpperCase()}
                        size='small'
                        className='ml-2 mt-2'
                        sx={{
                            backgroundColor: '#ff9800',
                            color: 'black',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '24px',
                            '& .MuiChip-icon': {
                                color: 'black'
                            }
                        }}
                    />
                    )
                }
                   
                    {/* <div className='rounded-bs-md absolute top-0 right-0 mbs-[-70px] border-[5px] mis-[-5px] border-be-0  border-backgroundPaper bg-backgroundPaper'>
          <img height={80} width={80} src={tournament.logo || '/images/empty/tournament.png'} className='rounded' alt='Profile Background' />
        </div> */}

                </CardMedia>
                <CardContent className='flex gap-5 justify-center flex-col items-center '>
                    <div className='flex rounded-bs-md mbs-[-70px] border-[5px] mis-[-5px] border-be-0  border-backgroundPaper bg-backgroundPaper'>
                        <img height={80} width={80} src={tournament.logo || '/images/empty/tournament.png'} className='rounded' alt='Profile Background' />
                    </div>

                    <Typography
                        variant='h4'
                        sx={{
                            fontWeight: 600,
                            textAlign: 'center'
                        }}
                    >
                        {tournament.name}
                    </Typography>

                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-row items-center gap-2 w-full'>
                            <i className='tabler-calendar' />
                            <Typography variant='body1' >
                                Del {formatDate(tournament.start_date, 'DD MMM YYYY')} al {formatDate(tournament.end_date, 'DD MMM YYYY')}
                            </Typography>
                        </div>
                        <div className='flex flex-row items-center gap-2 w-full'>
                            <i className='tabler-calendar' />
                            <Typography variant='body1'>
                                Inscripciones hasta: {formatDate(tournament.registration_deadline, 'DD MMM YYYY')}
                            </Typography>
                        </div>
                        <div className='flex flex-row items-center gap-2 w-full'>
                            <i className='tabler-map-pin' />
                            <Typography variant='body1'>
                                {tournament.city}, {tournament.country}
                            </Typography>
                        </div>
                    </div>
                    <div className='flex bg-primaryLight p-2 rounded-md  flex-col items-left gap-2 w-full'>
                        <Typography className=' font-bold' variant='h6'>Organizado por:</Typography>
                        <div className='flex flex-row items-center gap-2'>
                            <Avatar
                                alt={''}
                                src={tournament.organization_logo || ''}

                                className='cursor-pointer bs-[28px] is-[28px]'
                            />
                            <Typography variant='h6' >{tournament.organization_name}</Typography>
                        </div>
                    </div>
                    {/* <Button 
                onClick={e => {
                    e.stopPropagation()
                    handleCardClick()
                  }}
                fullWidth color='primary' variant='contained' >
        
          <span>Gestionar torneo</span>
        </Button> */}



                </CardContent>
            </ActionArea>

        </Card>
    )
}

export default TournamentItemCard