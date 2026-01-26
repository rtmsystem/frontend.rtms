import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { Division } from '@/types/apps/tournament/tournamentTypes'

type GenerateMatchesCardProps = {
    selectedDivision: Division
    handleGenerateMatches: () => void
    generateMatchesLoading: boolean
}
const GenerateMatchesCard = ({ selectedDivision, handleGenerateMatches, generateMatchesLoading }: GenerateMatchesCardProps) => {

    const getFormatLabel = (format: string) => {
        const labels: Record<string, string> = {
            knockout: 'Eliminación directa',
            double_slash: 'Doble eliminación',
            round_robin: 'Todos contra todos',
            round_robin_knockout: 'Grupos + Eliminación directa',
            league: 'Liga'
        }
        return labels[format] || format
    }

    return (
        <Box className="flex w-full ">
            <Card sx={{ width: '100%' }}>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-3 text-center">
                        {/* <CustomAvatar color='info' variant='rounded' size={60}>
                        <i className='tabler-tournament text-2xl text-white' />
                    </CustomAvatar> */}
                        <Typography variant='h5' fontWeight={600}>
                            Generar partidos automáticamente
                        </Typography>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Typography variant='body1' color='text.secondary' className='text-center'>
                            Este botón generará automáticamente todos los partidos para la categoría
                            basándose en su formato de competencia.
                        </Typography>

                        <div className="flex flex-wrap justify-center items-center gap-2 p-4 bg-action-hover rounded">
                            <Chip
                                icon={<i className='tabler-tournament text-base' />}
                                label={getFormatLabel(selectedDivision?.format || '')}
                                variant='outlined'
                                color='primary'
                                size='small'
                            />
                            <Chip
                                icon={<i className='tabler-users text-base' />}
                                label={`${selectedDivision?.participant_count || 0} jugadores`}
                                variant='outlined'
                                color='info'
                                size='small'
                            />
                        </div>

                        <Typography variant='body2' color='text.secondary' className='text-center'>
                            El sistema creará los partidos según el formato{' '}
                            <strong>{getFormatLabel(selectedDivision?.format || '')}</strong>{' '}
                            para los {selectedDivision?.participant_count || 0} jugadores registrados en esta categoría.
                        </Typography>
                    </div>

                    <div className="flex justify-center pt-2">
                        <LoadingButton
                            loading={generateMatchesLoading}
                            onClick={handleGenerateMatches}
                            variant='contained'
                            color='info'
                            size='large'
                            loadingPosition='start'
                            sx={{ minWidth: 200 }}
                        >
                            {generateMatchesLoading ? 'Generando partidos...' : 'Generar partidos'}
                        </LoadingButton>
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}

export default GenerateMatchesCard