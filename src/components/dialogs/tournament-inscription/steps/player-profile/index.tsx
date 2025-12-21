'use client'

// React Imports
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { InferInput } from 'valibot'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import PersonalInformation from './PersonalInformation'
import PhysicalInformation from './PhysicalInformation'
import DocumentInformation from './DocumentInformation'
import EmergencyContact from './EmergencyContact'
import PlayerPhotoUpload from './PlayerPhotoUpload'

// Schema Imports
import { playerProfileSchema } from '@/valibot/player-profile-schema'
import { Button, useMediaQuery, useTheme } from '@mui/material'


type FormData = InferInput<typeof playerProfileSchema>

interface PlayerProfileProps {
    onSuccess?: () => void
}

const PlayerProfile = ({ onSuccess }: PlayerProfileProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
   
    return (
        <Box className='flex flex-col gap-6'>
            {
                isMobile && (
                    <div className='flex flex-col gap-1'>
                        <Typography variant='h5'>Información del Jugador</Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Completa la información del perfil del jugador
                        </Typography>
                    </div>
                )

            }

            <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                    <PersonalInformation />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <PhysicalInformation />
                </Grid>

                {/* <Grid size={{ xs: 12 }}>
              <DocumentInformation />
            </Grid> */}

                <Grid size={{ xs: 12 }}>
                    <EmergencyContact />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <PlayerPhotoUpload />
                </Grid>
            </Grid>
            
        </Box>
    )
}

export default PlayerProfile

