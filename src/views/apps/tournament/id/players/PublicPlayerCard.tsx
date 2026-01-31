import { Involvement } from "@/types/apps/tournament/involvementTypes"
import { Box, Chip, Typography } from "@mui/material"
import PlayerAvatar from "@/components/PlayerAvatar"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Paper from "@mui/material/Paper"
type PlayerPublicCardProps = {
    involvement: Involvement,
    index: number
}

const PlayerPublicCard = ({ involvement, index }: PlayerPublicCardProps) => {
    // Hardcoded / Default values as requested
    const rank = index + 1

    const height = involvement.height_cm ? `${parseFloat(involvement.height_cm.toString())} cm` : '- -'
    const hand = involvement.handedness
        ? (involvement.handedness === 'right_handed' ? 'Derecha' : involvement.handedness === 'left_handed' ? 'Izquierda' : 'Ambidiestro')
        : '- -'
    const fullName = `${involvement.player_first_name} ${involvement.player_last_name}`

    return (
        <>

            <Paper
                className='bg-transparent border-2 border-primary '
                elevation={0}
                sx={{
                    // maxWidth: 360,
                    height: 390,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                }}>

                {/* Header Section */}
                <Box sx={{ p: 4.5, pb: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        {/* Rank and Flag */}
                        <Box>
                            <Typography className=''
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: '2.5rem',

                                    lineHeight: 1,
                                    // fontFamily: 'Roboto, sans-serif',
                                }}
                            >
                                {rank ? `# ${rank}` : '- -'}
                            </Typography>
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    display: 'inline-block',
                                    fontSize: '2.8rem',
                                }}
                            >
                                {involvement?.nationality_flag}
                            </Box>

                        </Box>

                        {/* Stats */}
                        <Box sx={{ textAlign: 'right' }}>
                            <Box sx={{ mb: 1.5 }} >
                                <Chip className='bg-primary text-white'
                                    label="Estatura"
                                    size="small"
                                    sx={{

                                        fontSize: '0.65rem',
                                        height: 20,
                                        mb: 0.5,
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,

                                        fontSize: '1.1rem',
                                    }}
                                >
                                    {height}
                                </Typography>
                            </Box>
                            <Box>
                                <Chip className='bg-primary text-white'
                                    label="Mano"
                                    size="small"
                                    sx={{
                                        fontSize: '0.65rem',
                                        height: 20,
                                        mb: 0.5,
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,

                                        fontSize: '1.1rem',
                                    }}
                                >
                                    {hand}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>


                </Box>



                {/* Background Primary */}
                <Box className='bg-primary'
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '55%',

                        zIndex: 1,
                    }}
                />
                {/* Player Image */}

                <PlayerAvatar
                    official_avatar={involvement.official_avatar}
                    player_avatar={involvement.player_avatar}
                    alt={fullName}
                />

                {/* Footer  */}
                <Box className='flex flex-col justify-center items-center py-1'
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        // height: '20%',
                        bgcolor: 'hsla(0, 0%, 0%, 0.60)',
                        zIndex: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        className='text-white capitalize'

                    >
                        {fullName}
                    </Typography>
                    <Typography
                        sx={{
                            filter: 'brightness(150%)'
                        }}
                        className='text-primary'
                        variant="h3">
                        { `${involvement.knockout_points} Ptos` }
                    </Typography>
                </Box>



            </Paper >




        </>
    )
}

export default PlayerPublicCard