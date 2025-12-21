'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import Login from './login'
import Register from './register'

interface StartRegisterProps {
  onSuccess?: () => void
}

type ViewType = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'verify-email'

const StartRegister = ({ onSuccess }: StartRegisterProps) => {
  // States
  const [currentView, setCurrentView] = useState<ViewType>('login')

  const handleGoToRegister = () => {
    setCurrentView('register')
  }

  const handleGoToLogin = () => {
    setCurrentView('login')
  }

  const handleGoToForgotPassword = () => {
    setCurrentView('forgot-password')
  }

  return (
    <Box className='flex flex-col gap-6 mx-auto w-full max-w-md'>
      <div className='flex flex-col gap-1'>
        <Typography variant='h5'>Iniciar sesión o registrarse</Typography>
        <Typography variant='body2' color='text.secondary'>
          Para continuar con la inscripción, necesitas tener una cuenta
        </Typography>
      </div>

      {currentView === 'login' && (
        <Login
          onSuccess={onSuccess}
          onGoToRegister={handleGoToRegister}
          onGoToForgotPassword={handleGoToForgotPassword}
        />
      )}

      {currentView === 'register' && (
        <Register onSuccess={onSuccess} onGoToLogin={handleGoToLogin} />
      )}
    </Box>
  )
}

export default StartRegister

