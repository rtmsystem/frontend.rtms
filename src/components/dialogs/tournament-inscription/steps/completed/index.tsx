'use client'

import { Box, Typography, Button, Stack } from "@mui/material"

interface CompletedStepProps {
    onClose: () => void
    onNewRegistration: () => void
}

const CompletedStep = ({ onClose, onNewRegistration }: CompletedStepProps) => {
    return (
        <Box className='flex flex-col items-center justify-center gap-6 w-full py-12 px-4'>
            <Box className='flex flex-col items-center gap-4 max-w-md text-center'>
                <Box 
                    className='flex items-center justify-center w-20 h-20 rounded-full bg-success/10 animate-pulse'
                >
                    <i className='tabler-circle-check text-success' style={{ fontSize: '80px' }} />
                </Box>
                <Typography variant='h4' className='font-bold'>
                    ¡Inscripción completada!
                </Typography>
                <Typography variant='body1' color='text.secondary' className='leading-relaxed'>
                    Tu proceso de inscripción se ha completado exitosamente. 
                    Serás notificado sobre el estado de tu registro a través de tu correo electrónico.
                </Typography>
                <Typography variant='body2' color='text.secondary' className='mt-2'>
                    Gracias por participar en nuestro torneo.
                </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className='w-full max-w-md mt-4'>
                <Button
                    variant='outlined'
                    color='secondary'
                    fullWidth
                    onClick={onNewRegistration}
                    size='large'
                >
                    Nuevo registro
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={onClose}
                    size='large'
                >
                    Ver Torneo
                </Button>
            </Stack>
        </Box>
    )
}

export default CompletedStep