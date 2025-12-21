import { Box, useTheme } from "@mui/material"
import { Set } from "@/types/apps/tournament/matchTypes"

type MatchSetsProps = {
    sets: Set[]
    maxSets: number
}

const MatchSets = ({ maxSets, sets }: MatchSetsProps) => {
    return (
        <Box className='flex  flex-row  gap-1 items-center justify-end'>
        {[...Array(maxSets)].map((set, index) => (
            <Box
                key={index}
                sx={{
                    ...(useTheme().palette.mode === 'dark' ? {
                        backgroundColor: 'transparent',
                      
                    } : {
                            backgroundColor: '#f9fafb',

                        }),
                    border: '0.05px solid',}}
                className='  sm:font-bold border-gray-200 rounded-sm w-4 h-4 p-3 sm:w-5 sm:h-5  sm:p-5 flex items-center justify-center'>
                    { sets[index]?.score > 0 ? sets[index]?.score : '-'}
                </Box>
            ))}
        </Box>
    )
}

export default MatchSets