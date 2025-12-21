'use client'

// React Imports
import { useState, useRef, useEffect } from 'react'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

// Type Imports
type AvatarUploadProps = {
  /** URL o string de la imagen actual */
  src?: string | null
  /** Texto alternativo para la imagen */
  alt?: string
  /** Callback cuando la imagen cambia (recibe File | null) */
  onChange?: (file: File | null) => void
  /** Si el componente es editable (muestra controles de upload/remove) */
  editable?: boolean
  /** Tamaño del avatar en píxeles */
  size?: number
  /** Clases CSS personalizadas para el contenedor */
  containerClassName?: string
  /** Clases CSS personalizadas para la imagen */
  imageClassName?: string
  /** Placeholder cuando no hay imagen */
  placeholder?: string
  /** Clases CSS personalizadas para el wrapper */
  wrapperClassName?: string
}

const AvatarUpload = ({
  src,
  alt = 'Avatar',
  onChange,
  editable = false,
  size = 150,
  containerClassName = '',
  imageClassName = '',
  placeholder = '/images/empty/tournament.png',
  wrapperClassName = 'flex rounded-bs-md mbs-[-70px] border-[5px] mis-[-5px] border-be-0 border-backgroundPaper bg-backgroundPaper',
}: AvatarUploadProps) => {
  const [preview, setPreview] = useState<string | null>(src || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Actualizar preview cuando cambia src
  useEffect(() => {
    setPreview(src || null)
  }, [src])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        return
      }

      // Crear preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
        onChange?.(file)
      }
      reader.readAsDataURL(file)
    }
    // Reset input para permitir seleccionar el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange?.(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const imageSrc = preview || placeholder
  const isFullWidth = imageClassName.includes('w-full') || containerClassName.includes('w-full')
  const imageStyle = isFullWidth ? {} : { height: size, width: size }

  return (
    <div
      className={`${wrapperClassName} ${containerClassName}`}
      style={{ position: 'relative' }}
    >
      <img
        {...(!isFullWidth && { height: size, width: size })}
        src={imageSrc}
        className={`rounded ${imageClassName}`}
        alt={alt}
        style={imageStyle}
      />
      {editable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 bg-black/60 backdrop-blur-[2px] rounded-be-md py-1.5">
            <Tooltip title="Subir imagen" arrow>
              <IconButton
                size="small"
                onClick={handleUploadClick}
                sx={{
                  color: 'white',
                  padding: '4px',
                  minWidth: 'auto',
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <i className="tabler-camera text-sm" />
              </IconButton>
            </Tooltip>
            {preview && (
              <Tooltip title="Remover imagen" arrow>
                <IconButton
                  size="small"
                  onClick={handleRemove}
                  sx={{
                    color: 'white',
                    padding: '4px',
                    minWidth: 'auto',
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.4)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <i className="tabler-trash text-sm" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AvatarUpload