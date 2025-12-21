'use client'

// MUI Imports
import Box from '@mui/material/Box'
import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

type EmptyStateProps = {
    icon?: string
    iconSize?: string
    title?: string
    description?: string | React.ReactNode
    padding?: number
}

const EmptyState = ({ 
    icon = 'tabler-users-off',
    iconSize = 'text-6xl',
    title = 'No hay elementos',
    description,
    padding = 8
}: EmptyStateProps) => {
    return (
        <Card color='primary' className='w-full p-10  max-w-lg mx-auto rounded-lg border-1 border-gray-700  flex justify-start flex-col items-center'>
            <i className={`${icon} ${iconSize}`} style={{ color: 'var(--mui-palette-text-disabled)', marginBottom: 2 }} />
            <Typography variant='h5' sx={{ marginBottom: 1, color: 'var(--mui-palette-text-secondary)' }}>{title}</Typography>
            <div className='text-center'>
                <Typography variant='h6' sx={{ color: 'var(--mui-palette-text-disabled)' }}>{description}</Typography>
            </div>


        </Card>
        // <Boxd
        //     sx={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         padding,
        //         textAlign: 'center'
        //     }}
        // >
        //     <i 
        //         className={`${icon} ${iconSize}`} 
        //         style={{ color: 'var(--mui-palette-text-disabled)', marginBottom: 2 }} 
        //     />
        //     <Typography variant='h5' sx={{ marginBottom: 1, color: 'var(--mui-palette-text-secondary)' }}>
        //         {title}
        //     </Typography>
        //     {description && (
        //         <Typography variant='body2' sx={{ color: 'var(--mui-palette-text-disabled)' }}>
        //             {description}
        //         </Typography>
        //     )}
        // </Box>
    )
}

export default EmptyState

