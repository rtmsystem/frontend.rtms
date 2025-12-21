// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import Role from '@/types/apps/user/role'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import ConfirmationDialog from '@/components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnClick'

import { useAuthToken } from '@/hooks/useAuthToken'
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import InscriptionDialog from '@/components/dialogs/tournament-inscription/index'
import AvatarUpload from '@/components/AvatarUpload'
import { useTournament } from '@/contexts/TournamentContext'


const TournamentHeader = ({ tournament: tournamentProp }: { tournament?: Tournament }) => {
  // Obtener el torneo del contexto (fuente principal) o usar la prop como fallback
  const contextTournament = useTournament()
  const tournament = contextTournament.tournament || tournamentProp
  const { updateTournament } = contextTournament

  const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)
  const { hasRequiredRole: isGuest } = useRoleBasedAccess(Role.GUEST)
  const { fetchApi } = useAuthToken()
  const [isTournamentPublished, setIsTournamentPublished] = useState(tournament?.status === 'published')
  const [loading, setLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(tournament?.logo || null)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const allDivisionsPublished = tournament?.divisions.every(division => division.is_published)

  // Sincronizar logoUrl con tournament.logo cuando cambie
  useEffect(() => {
    setLogoUrl(tournament?.logo || null)
  }, [tournament?.logo])

  // Sincronizar isTournamentPublished con tournament.status cuando cambie
  useEffect(() => {
    setIsTournamentPublished(tournament?.status === 'published')
  }, [tournament?.status])

  const handlePublishTournament = async () => {
    setLoading(true)
    const response = await fetchApi(`/tournaments/${tournament?.id}/publish/`, {
      method: 'POST',
      body: JSON.stringify({
        status: 'published'
      })
    })
    const result = await response.json()
    setLoading(false)
    if (result.success) {
      // Actualizar el torneo en el contexto con el nuevo estado
      if (tournament && result.data) {
        updateTournament({ ...tournament, ...result.data, status: 'published' })
      } else if (tournament) {
        updateTournament({ ...tournament, status: 'published' })
      }
      toast.success('Torneo publicado correctamente, ahora ya puede recibir inscripciones.')
      setIsTournamentPublished(true)
    } else {
      toast.error('Error al publicar el torneo, por favor intenta nuevamente.')
    }
  }

  const handleLogoChange = async (file: File | null) => {
    if (!tournament?.id) return

    setUploadingLogo(true)
    try {
      const formData = new FormData()
      
      if (file) {
        formData.append('logo', file)
      } else {
        // Si se remueve el logo, enviar un string vacío
        formData.append('logo', '')
      }

      const response = await fetchApi(`/tournaments/${tournament.id}/`, {
        method: 'PATCH',
        body: formData
      })

      const result = await response.json()
      
      if (response.ok) {
        // Actualizar el torneo en el contexto con los datos del servidor
        if (result.data && tournament) {
          updateTournament({ ...tournament, ...result.data })
        }
        
        if (file) {
          // Si se subió un archivo, crear preview local mientras se actualiza en el servidor
          const reader = new FileReader()
          reader.onload = () => {
            setLogoUrl(reader.result as string)
          }
          reader.readAsDataURL(file)
          
          // Actualizar con la URL del servidor si está disponible
          if (result.data?.logo) {
            setLogoUrl(result.data.logo)
          }
          toast.success('Logo actualizado correctamente.')
        } else {
          setLogoUrl(null)
          toast.success('Logo removido correctamente.')
        }
      } else {
        toast.error(result.message || 'Error al actualizar el logo, por favor intenta nuevamente.')
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor.')
    } finally {
      setUploadingLogo(false)
    }
  }


  const bannerImage = tournament?.banner || 'https://res.cloudinary.com/dd7dzmgeg/image/upload/v1761687717/Group_6_zfjjy7.png'

  return (
    <Card>
      <CardMedia
        image={bannerImage}
        className='bs-[250px]'
      />
      <CardContent className='flex gap-5 justify-center flex-col items-center md:items-end md:flex-row !pt-0 md:justify-start'>
        <AvatarUpload
          src={logoUrl}
          alt={tournament?.name || 'Tournament logo'}
          onChange={handleLogoChange}
          editable={isAdmin}
          size={150}
          placeholder='/images/empty/tournament.png'
        />
        <div className='flex w-full justify-start self-end flex-col items-center gap-6 sm:gap-0 sm:flex-row sm:justify-between sm:items-end'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h2'>{tournament?.name}</Typography>
            <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                <Avatar
                  alt={tournament?.organization_name || 'Organization logo'}
                  src={tournament?.organization_logo || ''}
                  className='cursor-pointer h-[38px] w-[38px]'
                />
                <Typography className='font-medium'>{tournament?.organization_name}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='tabler-map-pin' />
                <Typography className='font-medium'>
                  {`${tournament?.city}, ${tournament?.country}`}
                </Typography>
              </div>
            </div>
          </div>
          {isAdmin && !isTournamentPublished &&  (
            <OpenDialogOnElementClick
              element={Button}
              elementProps={{
                children: 'Publicar torneo',
                color: 'warning',
                variant: 'contained',
                startIcon: <i className='tabler-lock-open-2'></i>,
                className: 'flex gap-2',
              }}
              dialog={ConfirmationDialog  }
              dialogProps={{
                loading: loading,
                title: 'Publicar torneo',
                description: '¿Estás seguro de querer publicar este torneo?, tu torneo será visible para todo el público.',
                onConfirm: () => {
                  handlePublishTournament()
                }
              }}
            />
          )}
          {isGuest && isTournamentPublished && !allDivisionsPublished &&(
             <OpenDialogOnElementClick
             
             element={Button}
             elementProps={{
               children: 'Regístrate ahora',
               variant: 'contained',
               startIcon: <i className='tabler-lock-open-2'></i>,
               className: 'flex gap-2 cursor-pointer transition-all duration-300',
               sx: {
                background: 'linear-gradient(90deg, #ff6b6b 0%, #ffa94d 16.66%, #ffd93d 33.33%, #6bcf7f 50%, #4d9de0 66.66%, #9d8df1 83.33%, #c44569 100%)',
                backgroundSize: '300% 100%',
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
                fontWeight: 600,
                animation: 'rainbow-shift 8s ease-in-out infinite, rainbow-pulse 2s ease-in-out infinite',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 35px rgba(157, 141, 241, 0.6)',
                },
              },
             }}
             dialog={InscriptionDialog  }
            
           />
         )}

        
        </div>
      </CardContent>
      <ToastContainer />
    </Card>
  )
}

export default TournamentHeader
