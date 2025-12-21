'use client'

// React Imports
import { Controller, useWatch } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid2'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

// Component Imports
import CurrencyField from './CurrencyField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@core/components/mui/TextField'

type EarlyPaymentDiscountProps = {
  control: any
  errors: any
}

const EarlyPaymentDiscount = ({ control, errors }: EarlyPaymentDiscountProps) => {
  const earlyPaymentEnabled = useWatch({
    control,
    name: 'early_payment_discount_enabled'
  })

  return (
    <div className='flex flex-col gap-4'>
      <FormControlLabel
        control={
          <Controller
            name='early_payment_discount_enabled'
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value || false}
                onChange={(event) => {
                  field.onChange(event.target.checked)
                }}
              />
            )}
          />
        }
        label='Aplicar descuento por pago anticipado'
      />

      {earlyPaymentEnabled && (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant='body2' className='mbe-2'>
              Monto del descuento
            </Typography>
            <Controller
              name='early_payment_discount_amount'
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(value) => field.onChange(value ?? null)}
                  fullWidth
                  label='Monto del descuento'
                  placeholder='$0.00'
                  error={!!errors.early_payment_discount_amount}
                  helperText={errors.early_payment_discount_amount?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant='body2' className='mbe-2'>
              Fecha límite del descuento
            </Typography>
            <Controller
              name='early_payment_discount_deadline'
              control={control}
              render={({ field: { value, onChange } }) => (
                <AppReactDatepicker
                  selected={value ? new Date(value) : null}
                  showYearDropdown
                  showMonthDropdown
                  onChange={(date: Date | null) => {
                    onChange(date ? date.toISOString().split('T')[0] : null)
                  }}
                  placeholderText='DD/MM/YYYY'
                  customInput={
                    <CustomTextField
                      value={value || ''}
                      onChange={onChange}
                      fullWidth
                      label='Fecha límite'
                      error={!!errors.early_payment_discount_deadline}
                      helperText={errors.early_payment_discount_deadline?.message}
                    />
                  }
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default EarlyPaymentDiscount
