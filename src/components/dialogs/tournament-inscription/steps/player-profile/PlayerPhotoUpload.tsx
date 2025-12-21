'use client'

// React Imports
import { useEffect, useState, useRef } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// Components Imports
import { Controller, useFormContext } from 'react-hook-form'
import { InferInput } from 'valibot'
import { playerProfileSchema } from '@/valibot/player-profile-schema'

type FormData = InferInput<typeof playerProfileSchema>

const PlayerPhotoUpload = () => {
  const { control, watch } = useFormContext<FormData>()
  const photoValue = watch('avatar')
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseUrlToFile = async (imageUrl: string): Promise<File> => {
    const imageData = await fetch(imageUrl)
    const blob = await imageData.blob()
    const file = new File([blob], `avatar.${blob.type.split('/')[1]}`, {
      type: blob.type,
    })
    return file
  }

  useEffect(() => {
    if (photoValue) {
      if (photoValue instanceof File) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(photoValue)
      } else if (typeof photoValue === 'string') {
        if (photoValue.startsWith('data:') || photoValue.startsWith('blob:')) {
          setPreview(photoValue)
        } else {
          // Es una URL, convertir a File
          parseUrlToFile(photoValue)
            .then(file => {
              const reader = new FileReader()
              reader.onload = () => {
                setPreview(reader.result as string)
              }
              reader.readAsDataURL(file)
            })
            .catch(() => {
              setPreview(null)
            })
        }
      }
    } else {
      setPreview(null)
    }
  }, [photoValue])

  const handleAvatarChange = (onChange: (file: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
        onChange(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = (onChange: (file: File | null) => void) => () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <Card>
      <CardHeader title='Foto de Perfil' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box className='flex flex-col items-center gap-4'>
              <Box
                className='relative flex items-end justify-center w-40 h-40 rounded overflow-hidden'
                sx={{
                  borderWidth: 2,
                  borderStyle: 'solid',
                  borderColor: 'divider',
                }}
              >
                <Controller
                  name='avatar'
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <input
                        ref={fileInputRef}
                        accept='image/*'
                        className='hidden'
                        id='avatar-upload'
                        type='file'
                        onChange={handleAvatarChange(onChange)}
                      />
                      <div className='absolute inset-0 z-10 pointer-events-none' />
                      <div className='absolute bg-black bg-opacity-70 w-full flex items-end justify-center gap-2 pb-2 z-20'>
                        <IconButton
                          size='small'
                          onClick={() => fileInputRef.current?.click()}
                          sx={{
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                          }}
                        >
                          <i className='tabler-camera text-xl' />
                        </IconButton>
                        {preview && (
                          <IconButton
                            size='small'
                            onClick={handleRemoveAvatar(onChange)}
                            sx={{
                              color: 'white',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              },
                            }}
                          >
                            <i className='tabler-trash text-xl' />
                          </IconButton>
                        )}
                      </div>
                      <Avatar
                        sx={{
                          backgroundColor: 'background.default',
                          color: 'text.secondary',
                          width: '100%',
                          height: '100%',
                          borderRadius: 0,
                        }}
                        alt='Foto de perfil'
                        variant='square'
                        src={preview || undefined}
                        className='object-cover w-full h-full text-64 font-bold'
                      >
                        {!preview && <i className='tabler-user text-6xl' />}
                      </Avatar>
                    </>
                  )}
                />
              </Box>
              <Box className='text-center'>
                <p className='text-sm text-textSecondary'>
                  Haz clic en el ícono de cámara para subir una foto de perfil
                </p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PlayerPhotoUpload

