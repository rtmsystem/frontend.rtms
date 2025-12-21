// React Imports
import { useState } from 'react'
import type { MouseEvent } from 'react'

// MUI Imports
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useTournament } from '@/contexts/TournamentContext'

type SelectDropdownProps = {
    selectedIndex?: number
    onSelectionChange?: (index: number) => void
    disabled?: boolean
}

const SelectDropdown = (props: SelectDropdownProps = {}) => {
    const { selectedIndex: controlledSelectedIndex, onSelectionChange, disabled = false } = props
    // States
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [internalSelectedIndex, setInternalSelectedIndex] = useState<number>(0)
    const tournament = useTournament()
    const { divisions } = tournament?.tournament || []

    // Use controlled value if provided, otherwise use internal state
    const selectedIndex = controlledSelectedIndex !== undefined ? controlledSelectedIndex : internalSelectedIndex

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
       
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMenuItemClick = (index: number) => {
        setAnchorEl(null)
        if (onSelectionChange) {
            onSelectionChange(index)
        } else {
            setInternalSelectedIndex(index)
        }
    }

    return (
        <div >
            <Button  disabled={disabled} size='large' className='max-h-10 w-full max-w-64 flex-grow' endIcon={  <i className='tabler-caret-down-filled' />} variant='outlined' aria-controls='basic-menu' aria-haspopup='true' onClick={handleClick}>
              {divisions[selectedIndex]?.name}
            </Button>
            <Menu  id='basic-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
                {
                    divisions.map((option, index)=>(
                        <MenuItem key={index} onClick={()=>handleMenuItemClick(index)}>{option.name}</MenuItem>
                    ))
                }
            </Menu>
        </div>
    )

}

export default SelectDropdown