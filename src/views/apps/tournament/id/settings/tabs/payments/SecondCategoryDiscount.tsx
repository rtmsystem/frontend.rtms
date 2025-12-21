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

type SecondCategoryDiscountProps = {
  control: any
  errors: any
}

const SecondCategoryDiscount = ({ control, errors }: SecondCategoryDiscountProps) => {
  const secondCategoryEnabled = useWatch({
    control,
    name: 'second_category_discount_enabled'
  })

  return (
    <div className='flex flex-col gap-4'>
      <FormControlLabel
        control={
          <Controller
            name='second_category_discount_enabled'
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value || false}
                onChange={(event) => field.onChange(event.target.checked)}
              />
            )}
          />
        }
        label='Aplicar descuento por inscripción a segunda categoría'
      />

      {secondCategoryEnabled && (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant='body2' className='mbe-2'>
              Valor del descuento
            </Typography>
            <Controller
              name='second_category_discount_amount'
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  value={field.value ?? undefined}
                  onChange={(value) => field.onChange(value ?? null)}
                  fullWidth
                  label='Valor del descuento'
                  placeholder='$0.00'
                  error={!!errors.second_category_discount_amount}
                  helperText={errors.second_category_discount_amount?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default SecondCategoryDiscount
