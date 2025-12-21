'use client'

// React Imports
import { forwardRef } from 'react'

// MUI Imports
import CustomTextField from '@core/components/mui/TextField'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import { NumericFormat } from 'react-number-format'
import { InternalNumberFormatBase } from 'react-number-format/types/types'

type CurrencyFieldProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  value?: number | string
  onChange?: (value: number | undefined) => void
}

const CurrencyField = forwardRef<HTMLInputElement, CurrencyFieldProps>(
  ({ value, onChange, ...textFieldProps }, ref) => {
    return (
      <NumericFormat
        {...textFieldProps as InternalNumberFormatBase}
        getInputRef={ref}
        value={value || ''}
        onValueChange={(values) => {
          onChange?.(values.floatValue)
        }}
        thousandSeparator=','
        decimalSeparator='.'
        prefix='$'
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        customInput={CustomTextField}
      />
    )
  }
)

CurrencyField.displayName = 'CurrencyField'

export default CurrencyField
