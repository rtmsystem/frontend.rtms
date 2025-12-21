'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'

// Component Imports
import CustomTextField from '@/@core/components/mui/TextField'

type TournamentSearchProps = {
  onSearch: (searchTerm: string) => void
  placeholder?: string
}

const TournamentSearch = ({ onSearch, placeholder = 'Buscar torneos...' }: TournamentSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '400px' }}>
      <CustomTextField
        fullWidth
        size='small'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <i className='tabler-search text-xl' />
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  )
}

export default TournamentSearch

