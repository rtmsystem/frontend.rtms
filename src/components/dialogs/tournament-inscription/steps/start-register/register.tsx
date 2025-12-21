'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Schema Imports
import { registerSchema } from '@/valibot/auth-schema'

type RegisterFormData = InferInput<typeof registerSchema>

type ErrorType = {
  message: string[]
}

interface RegisterProps {
  onSuccess?: () => void
  onGoToLogin?: () => void
}

const Register = ({ onSuccess, onGoToLogin }: RegisterProps) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Register Form
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: valibotResolver(registerSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData) => {
    setIsLoading(true)
    setErrorState(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })

      const jsonResponse = await response.json()

      if (response.ok) {
        // After successful registration, automatically log in
        const loginRes = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false
        })

        if (loginRes && loginRes.ok && loginRes.error === null) {
          onSuccess?.()
        } else {
          if (loginRes?.error) {
            const error = JSON.parse(loginRes.error)
            setErrorState(error)
          }
        }
      } else {
        const errorMessage = jsonResponse.detail || jsonResponse.message || 'Error al registrar usuario'
        setErrorState({ message: Array.isArray(errorMessage) ? errorMessage : [errorMessage] })
      }
    } catch (error) {
      setErrorState({ message: ['Error al registrar usuario. Por favor, intenta de nuevo.'] })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      {errorState && (
        <Alert severity='error' onClose={() => setErrorState(null)}>
          {errorState.message[0]}
        </Alert>
      )}

      <form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              autoFocus
              fullWidth
              type='email'
              label='Email'
              placeholder='Ingresa tu email'
              onChange={e => {
                field.onChange(e.target.value)
                errorState !== null && setErrorState(null)
              }}
              {...((errors.email || errorState !== null) && {
                error: true,
                helperText: errors?.email?.message || errorState?.message[0]
              })}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Contraseña'
              placeholder='············'
              id='register-password'
              type={isPasswordShown ? 'text' : 'password'}
              onChange={e => {
                field.onChange(e.target.value)
                errorState !== null && setErrorState(null)
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              {...(errors.password && {
                error: true,
                helperText: errors.password.message
              })}
            />
          )}
        />
        <Button fullWidth variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </Button>
        <div className='flex justify-center items-center flex-wrap gap-2'>
          <Typography>¿Ya tienes una cuenta?</Typography>
          <Typography
            className='cursor-pointer'
            onClick={onGoToLogin}
            color='primary.main'
            sx={{ textDecoration: 'none' }}
          >
            Iniciar sesión
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default Register

