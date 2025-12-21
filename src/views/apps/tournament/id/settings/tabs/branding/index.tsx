'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomAvatar from '@core/components/mui/Avatar'
import Divider from '@mui/material/Divider'

// Component Imports
import AvatarUpload from '@/components/AvatarUpload'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'

// Hook Imports
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import { useTournament } from '@/contexts/TournamentContext'

type Props = {
  tournament?: Tournament
}

const BrandingTab = ({ tournament }: Props) => {
  // Hooks
  const { fetchApi } = useAuthToken()
  const { tournament: contextTournament, updateTournament } = useTournament()
  // Usar el torneo del contexto si está disponible, sino usar la prop
  const currentTournament = contextTournament || tournament

  // States
  const [bannerUrl, setBannerUrl] = useState<string | null>(currentTournament?.banner || null)
  const [uploadingBanner, setUploadingBanner] = useState(false)

  // Sincronizar bannerUrl con tournament.banner cuando cambie
  useEffect(() => {
    setBannerUrl(currentTournament?.banner || null)
  }, [currentTournament?.banner])

  // Handlers
  const handleBannerChange = async (file: File | null) => {
    if (!currentTournament?.id) return

    setUploadingBanner(true)
    try {
      const formData = new FormData()
      
      if (file) {
        formData.append('banner', file)
      } else {
        // Si se remueve el banner, enviar un string vacío
        formData.append('banner', '')
      }

      const response = await fetchApi(`/tournaments/${currentTournament.id}/`, {
        method: 'PATCH',
        body: formData
      })

      const result = await response.json()
      
      if (response.ok) {
        // Actualizar el torneo en el contexto con los datos del servidor
        if (result.data && currentTournament) {
          updateTournament({ ...currentTournament, ...result.data })
        }
        
        if (file) {
          // Si se subió un archivo, crear preview local mientras se actualiza en el servidor
          const reader = new FileReader()
          reader.onload = () => {
            setBannerUrl(reader.result as string)
          }
          reader.readAsDataURL(file)
          
          // Actualizar con la URL del servidor si está disponible
          if (result.data?.banner) {
            setBannerUrl(result.data.banner)
          }
          toast.success('Banner actualizado correctamente.')
        } else {
          setBannerUrl(null)
          toast.success('Banner removido correctamente.')
        }
      } else {
        toast.error(result.message || 'Error al actualizar el banner, por favor intenta nuevamente.')
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor.')
    } finally {
      setUploadingBanner(false)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <div className='flex items-center gap-4 mbe-6'>
              <CustomAvatar skin='light' color='primary' variant='rounded' size={50}>
                <i className='tabler-palette text-3xl' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>Marca del Torneo</Typography>
                <Typography variant='body2'>Personaliza el banner del torneo</Typography>
              </div>
            </div>

            <Divider className='mbe-6' />

            {/* Sección de Banner */}
            <div className='flex flex-col gap-4'>
              <Typography variant='h6'>Banner del Torneo</Typography>
              <div className='w-full'>
                <AvatarUpload
                  src={bannerUrl}
                  alt={currentTournament?.name || 'Tournament banner'}
                  onChange={handleBannerChange}
                  editable={true}
                  size={300}
                  placeholder='/images/empty/tournament.png'
                  wrapperClassName='w-full'
                  containerClassName='w-full'
                  imageClassName='w-full h-[250px] object-cover'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BrandingTab

