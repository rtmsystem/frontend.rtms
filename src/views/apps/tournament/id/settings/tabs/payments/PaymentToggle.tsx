'use client'

// MUI Imports
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

type PaymentToggleProps = {
  value: boolean
  onChange: (value: boolean) => void
}

const PaymentToggle = ({ value, onChange }: PaymentToggleProps) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
        />
      }
      label='¿Quieres cuota de inscripción para el torneo?'
    />
  )
}

export default PaymentToggle
