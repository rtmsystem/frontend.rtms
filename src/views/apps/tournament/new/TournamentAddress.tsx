import CustomTextField from "@/@core/components/mui/TextField"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid2"
import { Controller, useFormContext } from "react-hook-form"
import TournamentSchema from "@/valibot/tournament-schema"
import { InferInput } from "valibot"

type FormData = InferInput<typeof TournamentSchema>

const TournamentAddress = () => {
    const { control, formState: { errors } } = useFormContext<FormData>()
    return (
       <Card>
        <CardHeader title='Dirección' />
        <CardContent>
        <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}>
                    <Controller
                      name='address'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Dirección Completa'
                          placeholder='Ingrese la dirección completa'
                          error={!!errors.address}
                          helperText={errors.address?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='street_number'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Número de Calle'
                          placeholder='Ej: 12'
                          error={!!errors.street_number}
                          helperText={errors.street_number?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='street_location'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Calle/Localización'
                          placeholder='Ej: 34'
                          error={!!errors.street_location}
                          helperText={errors.street_location?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='postal_code'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Código Postal'
                          placeholder='Ingrese el código postal'
                          error={!!errors.postal_code}
                          helperText={errors.postal_code?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='city'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Ciudad'
                          placeholder='Ingrese la ciudad'
                          error={!!errors.city}
                          helperText={errors.city?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='state'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Estado/Departamento'
                          placeholder='Ingrese el estado o departamento'
                          error={!!errors.state}
                          helperText={errors.state?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name='country'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='País'
                          placeholder='Ingrese el país'
                          error={!!errors.country}
                          helperText={errors.country?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
        </CardContent>
        </Card>
    )
}

export default TournamentAddress