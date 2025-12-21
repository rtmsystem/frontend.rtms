import { Badge, Box, Typography } from "@mui/material"
import CustomAvatar from "@/@core/components/mui/Avatar"
import { Player } from "@/types/apps/tournament/playerTypes"
import AvatarGroup from "@mui/material/AvatarGroup"

type MatchPlayerProps = {
    player: Player
    partner: Player | null
    matchType: "doubles" | "singles"
}

const MatchPlayer = ({ player, partner, matchType }: MatchPlayerProps) => {
    return (
        <Box className='flex items-center gap-3 flex-1'>


            {/* Avatar */}
            {
                matchType === "doubles" ? (
                    <AvatarGroup className='pull-up' max={2}>
                        <Badge
                            overlap='circular'
                            className='hidden sm:flex'
                            badgeContent={<span className='text-2xl'>🇨🇴</span>}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}

                        >

                            <CustomAvatar
                                src={player?.avatar || ''}
                                alt={player?.first_name}
                                className='hidden sm:flex'
                                size={50}
                            />
                        </Badge>

                        <Badge
                            overlap='circular'
                            className='hidden sm:flex'
                            badgeContent={<span className='text-2xl'>🇨🇴</span>}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}

                        >

                            <CustomAvatar
                                src={player?.avatar || ''}
                                alt={player?.first_name}

                                size={50}
                            />
                        </Badge>
                    </AvatarGroup>
                )
                    : (
                        <Badge
                            className='hidden sm:flex'
                            overlap='circular'
                            badgeContent={<span className='text-2xl'>🇨🇴</span>}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}

                        >

                            <CustomAvatar
                                src={player?.avatar || ''}
                                alt={player?.first_name}

                                size={50}
                            />
                        </Badge>
                    )
            }


            {/* Información del jugador */}
            <Box className='flex gap-3 items-center flex-1'>

                <Box className='flex flex-col sm:flex-row md:items-center gap-1'>
                    <Box className='flex items-center gap-2'>
                        {
                            player?.first_name && player?.last_name ? (
                                <>
                                    <span className='sm:hidden text-2xl'>🇨🇴</span>
                                    <Typography className='xs:text-sm sm:text-lg' >
                                        {`${player?.first_name} ${player?.last_name}`}
                                    </Typography>
                                </>
                            ) : (
                                <Typography className='xs:text-sm sm:text-lg italic opacity-50' >
                                  [Por defenir]
                                </Typography>
                            )
                        }

                    </Box>

                    {
                        partner && (
                            <Box className='flex items-center gap-2'>

                                <span className='sm:hidden text-2xl'>🇨🇴</span>
                                <Typography className='xs:text-sm sm:text-lg' >
                                    <span className='hidden sm:inline '> {' / '} </span>
                                    {`${partner?.first_name} ${partner?.last_name}`}
                                </Typography>
                            </Box>
                        )
                    }

                </Box>

            </Box>


        </Box>
    )
}

export default MatchPlayer