'use client'
import Grid from '@mui/material/Grid2'
import TournamentAddHeader from './TournamentAddHeader'
import TournamentBasicInformation from './TournamentBasicInformation'
import TournamentContact from './TournamentContact'
import TournamentSchema from '@/valibot/tournament-schema'
import { InferInput } from 'valibot'
import { FormProvider, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import TournamentDates from './TournamentDates'
import TournamentAddress from './TournamentAddress'
import TournamentDivision from './TournamentDivision'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'

type FormData = InferInput<typeof TournamentSchema>

const NewTournament = () => {

  const { data: session } = useSession() 
 
  const methods = useForm<FormData>({
    resolver: valibotResolver(TournamentSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      contact_name: '',
      contact_phone: '',
      contact_email:  '',
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 5)),
      registration_deadline: new Date(new Date().setDate(new Date().getDate() + 4)),
      address: '',
      street_number: '',
      street_location: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      logo: '',
      divisions: [
        {
          name: '',
          description: '',
          format: '',
          max_participants: undefined,
          gender: '',
          participant_type: '',
          born_after: '1980-11-14',
          is_active: true
        }
      ]
    }
  })

  useEffect(() => {
    if (session?.user) {
      methods.setValue('contact_name', session.user.name || '')
      methods.setValue('contact_email', session.user.email || '')
    }
  }, [session, methods])

  return (
    <FormProvider {...methods}>
      <form noValidate>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <TournamentAddHeader />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <TournamentBasicInformation />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TournamentAddress />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TournamentDivision />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <TournamentContact />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TournamentDates />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default NewTournament