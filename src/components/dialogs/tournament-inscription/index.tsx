'use client'

import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, Typography, useMediaQuery, DialogActions } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import TournamentInscriptionMobileStepper from "./MobileStepper";
import TournamentInscriptionDesktopStepper from "./DesktopSteppe";
import CloseIcon from "@/@menu/svg/Close";
import CustomIconButton from "@/@core/components/mui/IconButton";
import StartRegister from "./steps/start-register/index";
import PlayerProfile from "./steps/player-profile/index";
import { valibotResolver } from '@hookform/resolvers/valibot'
import { playerProfileSchema } from '@/valibot/player-profile-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { InferInput } from 'valibot';
import Grid from '@mui/material/Grid2'
import { CountryType } from '@/types/apps/geographical/countries';
import CategoriesStep from './steps/categories';
import TermsConditionsStep from './steps/terms_conditions';
import PaymentStep from './steps/payment';
import { useEffect, useMemo } from 'react';
import CompletedStep from './steps/completed';
import { toast } from 'react-toastify';
import { useTournament } from '@/contexts/TournamentContext';

type FormData = InferInput<typeof playerProfileSchema>
type InscriptionDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    description: string
    onConfirm: () => void
    loading: boolean
}

const InscriptionDialog = (props: InscriptionDialogProps) => {
    const { open, setOpen } = props
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeStep, setActiveStep] = useState(0)
    const [isNextDisabled, setIsNextDisabled] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const { tournament } = useTournament()
    const hasActivePayment = tournament?.payment?.is_active || false

    const methods = useForm<FormData>({
        resolver: valibotResolver(playerProfileSchema),
        mode: 'onChange',
        defaultValues: {
            first_name: '',
            last_name: '',
            gender: '',
            second_last_name: '',
            nationality: {
                id: 0,
                name: '',
                phone_code: '',
                flag: ''
            },
            email: '',
            middle_name: '',
            date_of_birth: undefined,
            phone: '',
            height_cm: '',
            weight_kg: '',
            handedness: '',
            shirt_size: '',
            emergency_contact_first_name: '',
            emergency_contact_last_name: '',
            emergency_contact_phone: '',
            emergency_contact_relationship: '',
            involvements: [],
            privacy_policy_accepted: false,
            terms_conditions_accepted: false,
            avatar: '',
            payment_file: null,
            payment_method: null,
        }
    })

    const steps = useMemo(() => {
        const baseSteps = [
            {
                label: 'Perfil de jugador ',
                subtitle: 'Completa tu perfil de jugador para continuar',
                component: <PlayerProfile />
            },
            {
                label: 'Categorías',
                subtitle: 'Selecciona las categorías en las que deseas participar',
                component: <CategoriesStep setIsNextDisabled={setIsNextDisabled} />
            },
            {
                label: 'Exenciones & Términos',
                subtitle: 'Acepta los términos y condiciones para continuar',
                component: <TermsConditionsStep setIsNextDisabled={setIsNextDisabled} />
            }
        ]

        // Agregar paso de pago si hay pagos activos
        if (hasActivePayment) {
            baseSteps.push({
                label: 'Pago',
                subtitle: 'Adjunta el comprobante de pago para continuar',
                component: <PaymentStep setIsNextDisabled={setIsNextDisabled} />
            })
        }

        // Agregar paso de términos y condiciones
        baseSteps.push()

        return baseSteps
    }, [hasActivePayment, setIsNextDisabled])

    const { trigger, getValues, watch, formState: { isValid, errors } } = methods
    const involvements = watch('involvements') || []

    // Función helper para calcular el resumen de pago
    const calculatePaymentSummary = useMemo(() => {
        const payment = tournament?.payment
        const divisions = tournament?.divisions?.filter((division: { is_active: boolean }) => division.is_active) || []

        if (!payment || !payment.is_active || involvements.length === 0) {
            return {
                subtotal: 0,
                totalDiscount: 0,
                total: 0
            }
        }

        // Verifica si aplica descuento por pago adelantado
        const isEarlyPaymentDiscountApplicable = (): boolean => {
            if (!payment?.early_payment_discount_amount || !payment?.early_payment_discount_deadline) {
                return false
            }
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const deadline = new Date(payment.early_payment_discount_deadline)
            deadline.setHours(0, 0, 0, 0)
            return today <= deadline
        }

        const subscriptionFee = Number(payment.subscription_fee) || 0
        const secondCategoryDiscount = Number(payment.second_category_discount_amount) || 0
        const earlyPaymentDiscount = Number(payment.early_payment_discount_amount) || 0
        const hasEarlyDiscount = isEarlyPaymentDiscountApplicable() && earlyPaymentDiscount > 0

        const selectedDivisionIds = involvements.map(inv => inv.division_id).sort((a, b) => a - b)
        const firstDivisionId = selectedDivisionIds[0]

        const items = involvements.map(involvement => {
            const division = divisions.find((d: { id: number }) => d.id === involvement.division_id)
            if (!division) return null

            const isSecondCategory = involvement.division_id !== firstDivisionId
            let finalPrice = Number(subscriptionFee)
            let discount = 0

            // Aplicar descuento por segunda categoría si aplica
            if (isSecondCategory && secondCategoryDiscount > 0) {
                finalPrice = Number(subscriptionFee) - Number(secondCategoryDiscount)
                discount += Number(secondCategoryDiscount)
            }

            // Aplicar descuento por pago adelantado si aplica
            if (hasEarlyDiscount) {
                finalPrice = Number(finalPrice) - Number(earlyPaymentDiscount)
                discount += Number(earlyPaymentDiscount)
            }

            return {
                originalPrice: Number(subscriptionFee),
                finalPrice: Number(finalPrice) > 0 ? Number(finalPrice) : 0,
                discount: Number(discount)
            }
        }).filter(item => item !== null) as Array<{
            originalPrice: number
            finalPrice: number
            discount: number
        }>

        const subtotal = items.reduce((sum, item) => Number(sum) + Number(item.originalPrice), 0)
        const totalDiscount = items.reduce((sum, item) => Number(sum) + Number(item.discount), 0)
        const total = items.reduce((sum, item) => Number(sum) + Number(item.finalPrice), 0)

        return {
            subtotal: Number(subtotal) || 0,
            totalDiscount: Number(totalDiscount) || 0,
            total: Number(total) || 0
        }
    }, [involvements, tournament])

    useEffect(() => {
        setIsNextDisabled(activeStep == 0 ? false : true)
    }, [activeStep])


    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1)
        }

    }

    const handleClose = (event: React.SyntheticEvent<Element, Event>, reason: string) => {
        if (reason && reason === "backdropClick") {
          return
        }
        setOpen(false)
      }

    const continueToNextStep = async () => {
        trigger()
        const data = getValues()
        if (isValid) {
            const nationality_id = data.nationality.id

            if (activeStep === steps.length - 1) {
                setIsNextDisabled(true)
                const formData = new FormData()
                Object.keys(data).forEach((key) => {
                    const value = data[key as keyof FormData]
                    formData.append('nationality_id', String(nationality_id))
                    if (key !== 'avatar') {
                        formData.append(key, value)
                    }
                    if (value instanceof Date) {
                        formData.append(key, value.toISOString().split('T')[0])
                    } else {
                        formData.append(key, String(value))
                    }
                })

                if (data.avatar) {
                    formData.append('avatar', data.avatar)
                }

                // Agregar archivo de pago si existe
                if (data.payment_file && data.payment_file instanceof File) {
                    formData.append('payment_proof', data.payment_file)
                }

                // Agregar involvements como JSON string
                if (data.involvements && data.involvements.length > 0) {
                    formData.append('involvements', JSON.stringify(data.involvements))
                }

                // Agregar información de pago si hay pagos activos
                if (hasActivePayment) {
                    formData.append('total_paid', String(calculatePaymentSummary.total))
                    formData.append('subtotal', String(calculatePaymentSummary.subtotal))
                    formData.append('total_discount', String(calculatePaymentSummary.totalDiscount))
                    formData.append('payment_method', 'cash')
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/player-profiles/complete-subscription/`, {
                    method: 'POST',
                    body: formData
                })

                const result = await response.json()
                if (result.success) {
                    setIsCompleted(true)
                } else {
                    toast.error(result.message)
                }
            } else {
                handleNext()
            }
        }
    }

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1)
        }
    }



    const handleResetInscription = () => {
        setActiveStep(0)
        setIsCompleted(false)
        setIsNextDisabled(false)
        methods.reset()
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    return (
        <Dialog  className='overflow-y-auto h-[calc(100%)]' scroll='body' fullScreen={isMobile} fullWidth={true} maxWidth='xl' open={open} onClose={handleClose}>
            <DialogTitle className='flex w-full justify-between items-center'>
                <Typography>Proceso de inscripción</Typography>
                <CustomIconButton variant='outlined' size='small' color='secondary' onClick={() => setOpen(false)}>
                    <CloseIcon />
                </CustomIconButton>
            </DialogTitle>
            <DialogContent dividers={true} className='lg:h-[900px] h-[calc(100vh-100px)] overflow-y-auto'>
                {
                    isCompleted ? (
                        <CompletedStep
                            onClose={handleCloseModal}
                            onNewRegistration={handleResetInscription}
                        />
                    ) : (
                        <FormProvider {...methods}>
                            <form noValidate>
                                {isMobile ? (
                                    <TournamentInscriptionMobileStepper
                                        steps={steps}
                                        activeStep={activeStep}
                                        onNext={continueToNextStep}
                                        onBack={handleBack}
                                        isNextDisabled={isNextDisabled}
                                    />
                                ) : (
                                    <TournamentInscriptionDesktopStepper
                                        steps={steps}
                                        activeStep={activeStep}
                                    />
                                )}
                            </form>
                        </FormProvider>
                    )
                }

            </DialogContent>
            {
                !isMobile && !isCompleted && (
                    <DialogActions className='mt-5'>
                        <Button
                            variant='tonal'
                            onClick={handleBack}
                            disabled={activeStep === 0}

                            color='secondary'
                        >
                            Anterior
                        </Button>
                        <Button disabled={isNextDisabled} onClick={continueToNextStep} variant='contained' type='button' >
                            {activeStep === steps.length - 1 ? 'Completar inscripción' : 'Siguiente'}
                        </Button>
                    </DialogActions>
                )
            }

        </Dialog>
    );
}

export default InscriptionDialog;