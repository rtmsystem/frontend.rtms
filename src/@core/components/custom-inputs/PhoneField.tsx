'use client'

// React Imports
import { forwardRef, useState, useEffect } from 'react'

// MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import ButtonBase from '@mui/material/ButtonBase'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import type { TextFieldProps } from '@mui/material/TextField'
import Autocomplete, {
  autocompleteClasses,
  type AutocompleteCloseReason,
} from '@mui/material/Autocomplete'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

// Type Imports
import type { CountryType } from '@/types/apps/geographical/countries'
import InputAdornment from '@mui/material/InputAdornment'

// Phone Field Props
export type PhoneFieldProps = TextFieldProps & {
  phoneCodeName?: string
  phoneCodeValue?: string | null
  onPhoneCodeChange?: (country: CountryType | null) => void
  countries: CountryType[]
  defaultCountry?: CountryType | null
}

// Styled Autocomplete Popper
const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    backgroundColor: 'var(--mui-palette-background-paper)',
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: theme.spacing(1.5, 2),
      borderBottom: '1px solid var(--mui-palette-divider)',
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
      {
        backgroundColor: 'var(--mui-palette-action-hover)',
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}))

function PopperComponent(props: { anchorEl?: any; disablePortal?: boolean; open: boolean }) {
  const { disablePortal, anchorEl, open, ...other } = props
  return <StyledAutocompletePopper {...other} />
}

// Styled Popper
const StyledPopper = styled(Popper)(({ theme }) => ({
  border: '1px solid var(--mui-palette-divider)',
  boxShadow: theme.shadows[8],
  borderRadius: theme.shape.borderRadius,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: 'var(--mui-palette-text-primary)',
  backgroundColor: 'var(--mui-palette-background-paper)',
}))

// Styled Input for search
const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1.25, 2),
  width: '100%',
  borderBottom: '1px solid var(--mui-palette-divider)',
  '& input': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: 'transparent',
    border: '1px solid var(--mui-palette-customColors-inputBorder)',
    '&:focus': {
      borderColor: 'var(--mui-palette-primary-main)',
      boxShadow: 'var(--mui-customShadows-primary-sm)',
    },
  },
}))

// Styled Button for country selector
const StyledButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: theme.typography.body2.fontSize,
  color: 'var(--mui-palette-text-primary)',
  cursor: 'pointer',
  borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
  minWidth: '50px',
  border: '1px solid var(--mui-palette-customColors-inputBorder)',
  borderRight: 'none',
  backgroundColor: 'var(--mui-palette-background-paper)',
  '&:hover': {
    backgroundColor: 'var(--mui-palette-action-hover)',
  },
  '&.MuiInputBase-inputSizeSmall': {
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.25)}`,
  },
}))

const PhoneField = forwardRef<HTMLInputElement, PhoneFieldProps>((props, ref) => {
  const {
    phoneCodeName = 'phone_code',
    phoneCodeValue = '57',
    onPhoneCodeChange,
    countries = [],
    defaultCountry,
    value,
    onChange,
    error,
    helperText,
    label,
    placeholder,
    fullWidth,
    size = 'small',
    ...textFieldProps
  } = props

  const theme = useTheme()

  // State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    defaultCountry || countries.find(c => c.phone_code === phoneCodeValue) || null
  )
  const [pendingCountry, setPendingCountry] = useState<CountryType | null>(null)
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  // Update selected country when phoneCodeValue changes
  useEffect(() => {
    if (phoneCodeValue) {
      const country = countries.find(c => c.phone_code === phoneCodeValue)
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [phoneCodeValue, countries])

  // Handle click on country selector button
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingCountry(selectedCountry)
    setSearchInputValue('') // Reset search input when opening
    setAnchorEl(event.currentTarget)
  }

  // Handle close
  const handleClose = (updateCountry: boolean = true) => {
    if (updateCountry && pendingCountry) {
      setSelectedCountry(pendingCountry)
      onPhoneCodeChange?.(pendingCountry)
    }
    setSearchInputValue('') // Clear search input when closing
    if (anchorEl) {
      anchorEl.focus()
    }
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'phone-country-selector' : undefined

  // Get current country for display
  const currentCountry = selectedCountry

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        width: fullWidth ? '100%' : 'auto',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: label ? (size === 'small' ? '19px' : '32px') : 0,
          flexShrink: 0,
        }}
      >
        <StyledButton
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            padding: size === 'small' ? theme.spacing(0.75, 1.25) : theme.spacing(1, 1.5),
            height: size === 'small' ? '38px' : '40px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: size === 'small' ? '20px' : '22px', lineHeight: 1 }}>
            {currentCountry?.flag || '🌐'}
          </span>
          <i className='tabler-chevron-down' style={{ fontSize: '16px', opacity: 0.7 }} />
        </StyledButton>
      </Box>
      <CustomTextField
        {...textFieldProps}
        ref={ref}
        fullWidth={fullWidth}
        size={size}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                {`+ ${currentCountry?.phone_code}`}
              </InputAdornment>
            )
          }
        }}
        helperText={helperText}
        sx={{
          flex: 1,
          '& .MuiFilledInput-root': {
            borderTopLeftRadius: "0px !important",
            borderBottomLeftRadius: "0px !important",
            borderRadius: `px 0`,
            '& fieldset': {
              borderLeft: 'none',
            },
            '&:hover fieldset': {
              borderLeft: 'none',
            },
            '&.Mui-focused fieldset': {
              borderLeft: 'none',
            },
            '&.Mui-error fieldset': {
              borderLeft: 'none',
            },
          },
          ...textFieldProps.sx,
        }}
      />
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement='bottom-start'>
        <ClickAwayListener onClickAway={() => handleClose(false)}>
          <Box>
            <Box
              sx={{
                borderBottom: '1px solid var(--mui-palette-divider)',
                padding: theme.spacing(2),
                fontWeight: theme.typography.fontWeightMedium,
                fontSize: theme.typography.body2.fontSize,
                color: 'var(--mui-palette-text-primary)',
              }}
            >
              Seleccionar código de país
            </Box>
            <CustomAutocomplete
              open
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason,
              ) => {
                if (reason === 'escape') {
                  handleClose(false)
                }
              }}
              value={null}
              inputValue={searchInputValue}
              onInputChange={(event, newInputValue) => {
                setSearchInputValue(newInputValue)
              }}
              onChange={(event, newValue) => {
                setPendingCountry(newValue as CountryType | null)
                if (newValue) {
                  setSelectedCountry(newValue as CountryType)
                  onPhoneCodeChange?.(newValue as CountryType)
                }
                handleClose(false)
              }}
              options={countries}
              getOptionLabel={(option) => {
                if (!option || typeof option === 'string') return ''
                return `${option.name} (+${option.phone_code})`
              }}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              filterOptions={(options, { inputValue }) => {
                if (!inputValue) return options
                const normalizedInput = inputValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

                return options.filter((option) => {
                  const normalizedName = option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                  return (
                    normalizedName.includes(normalizedInput) ||
                    option.phone_code.includes(inputValue) ||
                    option.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                })
              }}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props as any
                return (
                  <li key={key} {...optionProps}>
                    <Box
                      component='span'
                      sx={{
                        fontSize: '20px',
                        marginRight: theme.spacing(1),
                      }}
                    >
                      {option.flag}
                    </Box>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(0.25),
                      }}
                    >
                      <span style={{ fontWeight: theme.typography.fontWeightMedium }}>
                        {option.name}
                      </span>
                      <span style={{ color: 'var(--mui-palette-text-secondary)', fontSize: '12px' }}>
                        +{option.phone_code}
                      </span>
                    </Box>
                  </li>
                )
              }}
              slots={{
                popper: PopperComponent,
              }}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder='Buscar país o código...'
                />
              )}
            />
          </Box>
        </ClickAwayListener>
      </StyledPopper>
    </Box>
  )
})

PhoneField.displayName = 'PhoneField'

export default PhoneField
