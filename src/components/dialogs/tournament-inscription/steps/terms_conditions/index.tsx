import { playerProfileSchema } from "@/valibot/player-profile-schema"
import { Box, Checkbox, FormControlLabel, Link, Typography, useTheme, useMediaQuery } from "@mui/material"
import { useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { InferInput } from "valibot"

interface TermsConditionsStepProps {
    setIsNextDisabled: (value: boolean) => void
}
const TermsConditionsStep = ({ setIsNextDisabled }: TermsConditionsStepProps) => {

    const methods = useFormContext<InferInput<typeof playerProfileSchema>>()
    const { control, watch } = methods
    const privacyPolicyAccepted = watch('privacy_policy_accepted')
    const termsConditionsAccepted = watch('terms_conditions_accepted')
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        if (!privacyPolicyAccepted || !termsConditionsAccepted) {
            setIsNextDisabled(true)
        } else {
            setIsNextDisabled(false)
        }
    }, [privacyPolicyAccepted, termsConditionsAccepted])

    return (
        <Box className="flex flex-col gap-2">
            {
                isMobile && (
                    <div className='flex flex-col gap-1 mb-5'>
                        <Typography variant='h5'>Términos y Condiciones</Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Acepta los términos y condiciones del torneo
                        </Typography>
                    </div>
                )
            }
            <FormControlLabel
                control={
                    <Controller
                        control={control}
                        name='privacy_policy_accepted'
                        rules={{
                            required: 'Este campo es requerido'
                        }}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                value={field.value}

                                name='privacy_policy_accepted' />
                        )}
                    />
                }
                label={<Typography variant="body1">Acepto el Tratamiento de mis Datos Personales según la <Link href="/legal/privacy-policy" target="_blank">Política de Privacidad</Link></Typography>}
            />

            <FormControlLabel
                control={
                    <Controller
                        control={control}
                        name='terms_conditions_accepted'
                        rules={{
                            required: 'Este campo es requerido'
                        }}
                        render={({ field }) => (
                            <Checkbox
                                checked={field.value}
                                onChange={field.onChange}
                                value={field.value}
                                name='terms_conditions_accepted' />
                        )}
                    />
                }
                label={<Typography variant="body1">Acepto los <Link href="/legal/terms-conditions" target="_blank">Términos y Condiciones del torneo.</Link></Typography>}
            />

        </Box>
    )
}

export default TermsConditionsStep