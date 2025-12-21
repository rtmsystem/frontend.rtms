'use client'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material/Card'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'


//Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { CardSimpleHorizontalWithBorderProps } from '@/types/pages/widgetTypes'

type Props = CardProps & {
    color: ThemeColor
}

const Card = styled(MuiCard)<Props>(({ color }) => ({
    transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
    borderBottomWidth: '2px',
    borderBottomColor: `var(--mui-palette-${color}-darkerOpacity)`,
    '[data-skin="bordered"] &:hover': {
        boxShadow: 'none'
    },
    '&:hover': {
        borderBottomWidth: '3px',
        borderBottomColor: `var(--mui-palette-${color}-main) !important`,
        boxShadow: 'var(--mui-customShadows-lg)',
        marginBlockEnd: '-1px'
    }
}))

const SimpleHorizontalWithBorder = (props: CardSimpleHorizontalWithBorderProps) => {
    // Props
    const { title, description, avatarIcon, color } = props

    return (
        <Card color={color || 'primary'}>
            <CardContent className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <CustomAvatar   color={color} skin='light-static' variant='circular'>
                        <i className={classnames(avatarIcon, 'text-[18px]')} />
                    </CustomAvatar>
                    <div className='flex flex-col'>
                        <Typography variant='body1'>{description}</Typography>
                        <Typography variant='h6'>{title}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SimpleHorizontalWithBorder
