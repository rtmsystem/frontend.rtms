'use client'

import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import {  useFormContext } from "react-hook-form"
import { useAuthToken } from '@/hooks/useAuthToken'
import TournamentSchema from "@/valibot/tournament-schema"
import { InferInput } from "valibot"
import { useRouter } from "next/navigation"
import Alert from "@mui/material/Alert"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"


type FormData = InferInput<typeof TournamentSchema>
 

const TournamentAddHeader = () => {

  const methods = useFormContext<FormData>()
  const router = useRouter()
  const { trigger, formState: { isValid } } = methods
  const { fetchApi } = useAuthToken()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: session } = useSession() 

  const onSubmit = async () => {
    setSubmitError(null)
    trigger()
    const data = methods.getValues()
    if (isValid) {
      // Crear FormData con los datos del formulario
      const formData = new FormData()
      
      // Agregar campos simples
      Object.keys(data).forEach((key) => {
        if (key !== 'divisions' && key !== 'logo') {
          const value = data[key as keyof FormData]
          if (value !== null && value !== undefined && value !== '') {
            // Convertir fechas a formato ISO string
            if (value instanceof Date) {
              formData.append(key, value.toISOString().split('T')[0])
            } else {
              formData.append(key, String(value))
            }
          }
        }
      })
      
      // Agregar divisions como JSON string
      if (data.divisions && data.divisions.length > 0) {
        formData.append('divisions', JSON.stringify(data.divisions))
      }
      
      // Agregar logo si existe (puede ser un archivo o string vacío)
      if (data.logo) {
        formData.append('logo', data.logo)
      }
      
      const response = await fetchApi(`/tournaments/`, {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      if (result.success) {
        router.push(`/tournaments/${result.data.id}/home`)
      } else {
        const nonFieldError = result?.errors?.non_field_errors?.[0]
        setSubmitError(nonFieldError ?? result?.message ?? 'Ocurrió un error al crear el torneo.')
      }
    } else {
      setSubmitError('Formulario inválido. Por favor, revisa los campos requeridos.')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
        <div>
          <Typography variant='h4' className='mbe-1'>
            Crear Torneo
          </Typography>
          <Typography>Crea un nuevo torneo para tu organización</Typography>
        </div>

        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button onClick={() => router.push('/tournaments')} variant='tonal' color='secondary'>
            Cancelar
          </Button>
          <Button type='button' variant='contained' onClick={onSubmit}>Guardar como borrador</Button>
          {/* <Button type='button' variant='contained' onClick={onSubmit}>Publicar torneo</Button> */}
        </div>
      </div>
      {
        submitError && (
          <Alert onClose={() => setSubmitError(null)} severity='error'>
            {submitError}
          </Alert>
        )
      }
    </div>

  )
}

export default TournamentAddHeader