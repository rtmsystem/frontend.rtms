
import { Avatar, Box } from "@mui/material"

type PlayerAvatarProps = {
    official_avatar?: string | null
    player_avatar?: string | null
    alt?: string,
    gender?: 'male' | 'female'
}

const PlayerAvatar = ({ official_avatar, player_avatar, alt, gender }: PlayerAvatarProps) => {

    // 1. Check official_avatar
    if (official_avatar) {
        return (
            <Box
                component="img"
                src={official_avatar}
                alt={alt}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    zIndex: 2,
                }}
            />
        )
    }

    // 2. Check player_avatar
    if (player_avatar) {
        return (
            <Avatar
                src={player_avatar}
                alt={alt}
                sx={{
                    borderWidth: 6,
                    borderColor: 'primary.main',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-70%)',
                    height: '11em',
                    width: '11em',
                    objectFit: 'contain',
                    zIndex: 2,
                }}
            />
        )
    }

    // 3. Fallback (Box with default image)
    return (
        <Avatar
            src=''
            alt={alt}
            sx={{
                borderWidth: 6,
                borderColor: 'primary.main',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%) translateY(-70%)',
                height: '11em',
                width: '11em',
                objectFit: 'contain',
                zIndex: 2,
            }}
        />
    )
}

export default PlayerAvatar
