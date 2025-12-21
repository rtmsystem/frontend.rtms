'use client'

// React Imports
import { createContext, useContext, useState, useCallback } from 'react'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'
import type { ChildrenType } from '@core/types'
import type { CountryType } from '@/types/apps/geographical/countries'

// Tournament Context Props
export type TournamentContextProps = {
  tournament: Tournament
  countries: CountryType[]
  updateTournament: (updatedTournament: Partial<Tournament> | Tournament) => void
}

// Tournament Context
export const TournamentContext = createContext<TournamentContextProps | null>(null)

// Tournament Provider Props
type TournamentProviderProps = ChildrenType & {
  tournament: Tournament
  countries: CountryType[]
}

// Tournament Provider
export const TournamentProvider = (props: TournamentProviderProps) => {
  const { children, tournament: initialTournament, countries } = props
  const [tournament, setTournament] = useState<Tournament>(initialTournament)

  const updateTournament = useCallback((updatedTournament: Partial<Tournament> | Tournament) => {
    setTournament(prevTournament => ({
      ...prevTournament,
      ...updatedTournament
    }))
  }, [])

  return (
    <TournamentContext.Provider value={{ tournament, countries, updateTournament }}>
      {children}
    </TournamentContext.Provider>
  )
}

// Hook to use Tournament Context
export const useTournament = () => {
  const context = useContext(TournamentContext)

  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider')
  }

  return context
}