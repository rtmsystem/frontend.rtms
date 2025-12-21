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
import { loginSchema } from '@/valibot/auth-schema'

type LoginFormData = InferInput<typeof loginSchema>

type ErrorType = {
  message: string[]
}

interface LoginProps {
  onSuccess?: () => void
  onGoToRegister?: () => void
  onGoToForgotPassword?: () => void
}

const Login = ({ onSuccess, onGoToRegister, onGoToForgotPassword }: LoginProps) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Login Form
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    setIsLoading(true)
    setErrorState(null)

    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (res && res.ok && res.error === null) {
        onSuccess?.()
      } else {
        if (res?.error) {
          const error = JSON.parse(res.error)
          setErrorState(error)
        }
      }
    } catch (error) {
      setErrorState({ message: ['Error al iniciar sesión. Por favor, intenta de nuevo.'] })
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
              id='login-password'
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
              {...(errors.password && { error: true, helperText: errors.password.message })}
            />
          )}
        />
        <div className='flex justify-end'>
          <Typography
            className='cursor-pointer'
            color='primary.main'
            onClick={onGoToForgotPassword}
            sx={{ textDecoration: 'none' }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </div>
        <Button fullWidth variant='contained' type='submit' disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
        <div className='flex justify-center items-center flex-wrap gap-2'>
          <Typography>¿Nuevo en nuestra plataforma?</Typography>
          <Typography
            className='cursor-pointer'
            onClick={onGoToRegister}
            color='primary.main'
            sx={{ textDecoration: 'none' }}
          >
            Crear una cuenta
          </Typography>
        </div>
      </form>
    </div>
  )
}

export default Login

