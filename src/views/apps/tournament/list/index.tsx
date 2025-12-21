'use client'

// React Imports
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Component Imports
import TournamentSearch from './TournamentSearch'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import TournamentItemCard from './TournamentItemCard'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import Role from '@/types/apps/user/role'

type TournamentListProps = {
  tournaments: Tournament[]
}

const ITEMS_PER_PAGE = 6

const TournamentList = ({ tournaments }: TournamentListProps) => {
    
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { hasRequiredRole: isAdmin } = useRoleBasedAccess(Role.ADMIN)

  // Filtrar torneos basado en el término de búsqueda
  const filteredTournaments = useMemo(() => {
    if (!searchTerm.trim()) return tournaments

    const searchLower = searchTerm.toLowerCase()
    return tournaments.filter(
      tournament =>
        tournament.name.toLowerCase().includes(searchLower) ||
        tournament.city?.toLowerCase().includes(searchLower) ||
        tournament.state?.toLowerCase().includes(searchLower) ||
        tournament.organization_name?.toLowerCase().includes(searchLower) ||
        tournament.created_by_name?.toLowerCase().includes(searchLower)
    ) ?? []
  }, [tournaments, searchTerm])

  // Calcular paginación
  const totalPages = Math.ceil(filteredTournaments?.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedTournaments = filteredTournaments?.slice(startIndex, endIndex)

  // Resetear página cuando cambia el término de búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddTournament = () => {
    router.push('/tournaments/new')
  }

  return (
    <Box sx={{ padding: { xs: 4, sm: 6 } }}>
      {/* Header con búsqueda y botón agregar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 3,
          marginBottom: 6
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant='h4' sx={{ marginBottom: 2, fontWeight: 700 }}>
            Torneos
          </Typography>
          <TournamentSearch onSearch={handleSearch} />
        </Box>
        {
          isAdmin && (
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={handleAddTournament}
              sx={{
                minWidth: { xs: '100%', sm: '200px' },
                height: '40px'
              }}
            >
              Nuevo Torneo
            </Button>
          )
        }
      </Box>

      {/* Lista de torneos */}
      {paginatedTournaments?.length > 0 ? (
        <>
          <Grid container spacing={4} sx={{ marginBottom: 6 }}>
            {paginatedTournaments.map(tournament => (
              <Grid key={tournament.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <TournamentItemCard tournament={tournament} />
              </Grid>
            ))}
          </Grid>

          {/* Paginación */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 4
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color='primary'
                size='large'
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            textAlign: 'center'
          }}
        >
          <i className='tabler-search-off text-6xl' style={{ color: 'var(--mui-palette-text-disabled)', marginBottom: 2 }} />
          <Typography variant='h5' sx={{ marginBottom: 1, color: 'var(--mui-palette-text-secondary)' }}>
            No se encontraron torneos
          </Typography>
          <Typography variant='body2' sx={{ color: 'var(--mui-palette-text-disabled)' }}>
            {searchTerm
              ? 'Intenta con otro término de búsqueda'
              : 'No hay torneos disponibles en este momento'}
          </Typography>
        </Box>
      )}

      {/* Información de resultados */}
      {filteredTournaments?.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
            padding: 2
          }}
        >
          <Typography variant='body2' sx={{ color: 'var(--mui-palette-text-secondary)' }}>
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredTournaments.length)} de {filteredTournaments.length}{' '}
            {filteredTournaments.length === 1 ? 'torneo' : 'torneos'}
            {searchTerm && ` para "${searchTerm}"`}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TournamentList
