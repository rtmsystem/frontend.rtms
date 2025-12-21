import { Involvement } from "@/types/apps/tournament/involvementTypes"
import Card from '@mui/material/Card'
import CustomAvatar from '@/@core/components/mui/Avatar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type PlayerPublicCardProps = {
    involvement: Involvement
}

const PlayerPublicCard = ({ involvement }: PlayerPublicCardProps) => {
    const fullName = `${involvement.player_first_name} ${involvement.player_last_name}`
    

    return (
        <Card 
            className='overflow-hidden'
            sx={{
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            {/* Sección superior con gradiente */}
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #14b8a6 0%, transparent 100%)',
                    padding: { xs: 3, sm: 4 },
                    position: 'relative',
                }}
            >
                <Box className='flex items-start gap-4'>
                    {/* Avatar */}
                    <CustomAvatar className='rounded-bs-md border-[5px]    border-backgroundPaper bg-backgroundPaper'
                        src={involvement.player_avatar || ''} 
                        size={80}
                        // sx={{
                        //     borderRadius: 2,
                        //     border: '2px solid',
                        // }}
                    />
                    
                    {/* Información del jugador */}
                    <Box className='flex-1'>
                        <Typography 
                            variant='h5' 
                            className='text-white font-bold '
                            sx={{
                                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                fontWeight: 700,
                            }}
                        >
                            {fullName}
                        </Typography>
                        
                        {/* Bandera y país */}
                        <Box className='flex items-center gap-2'>
                            <span className='text-2xl'>{involvement.nationality_flag}</span>
                            <Typography 
                                className='text-lg'
                                variant='body2' 
                               
                                // sx={{
                                //     fontSize: '1rem',
                                // }}
                            >
                                {involvement.nationality_name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Sección inferior con información adicional */}
            <Box
                sx={{
                    padding: { xs: 2, sm: 3 },
                    backgroundColor: 'transparent',
                }}
            >
                <Box className='flex flex-col gap-3'>
                    {/* Estatura */}
                    <Box className='flex justify-between items-center'>
                        <Typography 
                            variant='body2' 
                            // className='font-bold text-gray-800'
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                            }}
                        >
                            Estatura
                        </Typography>
                        <Typography 
                            variant='body2' 
                            sx={{
                                fontSize: '0.875rem',
                            }}
                        >
                            {involvement.height_cm ? involvement.height_cm + ' cm' : '- -'}
                        </Typography>
                    </Box>

                    {/* Mano */}
                    <Box className='flex justify-between items-center'>
                        <Typography 
                            variant='body2' 
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 600,
                            }}
                        >
                            Mano
                        </Typography>
                        <Typography 
                            variant='body2' 
                          
                            sx={{
                                fontSize: '0.875rem',
                            }}
                        >
                            {involvement.handedness ? involvement.handedness === 'right_handed' ? 'Derecha' : involvement.handedness === 'left_handed' ? 'Izquierda' : 'Ambidiestro' : '- -'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}

export default PlayerPublicCard