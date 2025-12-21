import Grid from "@mui/material/Grid2"
import CustomTextField from "@/@core/components/mui/TextField"
import Typography from "@mui/material/Typography"
import { Control, Controller, useFieldArray, useFormContext, FieldArrayWithId, FieldErrors } from "react-hook-form"
import { InferInput } from "valibot"
import { playerProfileSchema } from "@/valibot/player-profile-schema"
import { useEffect } from "react"
type FormData = InferInput<typeof playerProfileSchema>

interface ExtraContentProps {
    control: Control<FormData>,
    index: number,
    errors: FieldErrors<FormData>

}

const PartnerInfo = ({  control, index, errors }: ExtraContentProps) => {
    
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Typography variant='h6' color='text.secondary'>Datos del compañero</Typography>
           
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name={`involvements.${index}.partner_first_name` as const}
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Nombre'
                                    error={Boolean(errors?.involvements?.[index]?.partner_first_name)}
                                    helperText={errors?.involvements?.[index]?.partner_first_name?.message as string | undefined}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name={`involvements.${index}.partner_last_name` as const}
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Apellido'
                                    error={Boolean(errors?.involvements?.[index]?.partner_last_name)}
                                    helperText={errors?.involvements?.[index]?.partner_last_name?.message as string | undefined}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                             name={`involvements.${index}.partner_email` as const}
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    type='email'
                                    label='Email'
                                    error={Boolean(errors?.involvements?.[index]?.partner_email)}
                                    helperText={errors?.involvements?.[index]?.partner_email?.message as string | undefined}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
           
        </div>
    )
}

export default PartnerInfo