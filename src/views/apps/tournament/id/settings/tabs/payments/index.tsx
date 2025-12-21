'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import PaymentToggle from './PaymentToggle'
import PaymentDescriptionEditor from './PaymentDescriptionEditor'
import CurrencyField from './CurrencyField'
import EarlyPaymentDiscount from './EarlyPaymentDiscount'
import SecondCategoryDiscount from './SecondCategoryDiscount'

// Type Imports
import type { Tournament } from '@/types/apps/tournament/tournamentTypes'

// Hook Imports
import { useAuthToken } from '@/hooks/useAuthToken'
import { toast } from 'react-toastify'
import { useTournament } from '@/contexts/TournamentContext'

// Schema Imports
import { paymentSchema } from '@/valibot/payment-schema'
import { colorKeywords } from '@iconify/utils'
import { DatabaseSync } from 'node:sqlite'

type Props = {
    tournament?: Tournament
}

type FormData = InferInput<typeof paymentSchema>



const PaymentsTab = ({ tournament }: Props) => {
    // Hooks
    const { fetchApi } = useAuthToken()
    const { tournament: contextTournament, updateTournament } = useTournament()
    const currentTournament = contextTournament || tournament
    const paymentInfo = currentTournament?.payment || null

    // States
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const defaultValues: FormData = {
        payment_information: paymentInfo?.payment_information || null,
        early_payment_discount_amount: paymentInfo?.early_payment_discount_amount || 0,
        early_payment_discount_deadline: paymentInfo?.early_payment_discount_deadline || null,
        second_category_discount_amount: paymentInfo?.second_category_discount_amount || 0,
        subscription_fee: paymentInfo?.subscription_fee || 0,
        is_active: paymentInfo?.is_active || false,
        early_payment_discount_enabled: !!paymentInfo?.early_payment_discount_amount,
        second_category_discount_enabled: !!paymentInfo?.second_category_discount_amount,
    }


    // Form
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        trigger,
        getValues,
        setValue,
        setError,
        clearErrors,
        formState: { isValid }
    } = useForm<FormData>({
        resolver: valibotResolver(paymentSchema),
        mode: 'onChange',
        defaultValues:  defaultValues
    })

    const paymentsEnabled = watch('is_active')
    const earlyPaymentDiscountEnabled = watch('early_payment_discount_enabled')
    const earlyPaymentDiscountAmount = watch('early_payment_discount_amount')
    const earlyPaymentDiscountDeadline = watch('early_payment_discount_deadline')
    const secondCategoryDiscountEnabled = watch('second_category_discount_enabled')
    const secondCategoryDiscountAmount = watch('second_category_discount_amount')

    // Validación condicional para early_payment_discount_amount
    useEffect(() => {
        if (earlyPaymentDiscountEnabled) {
            // Si está habilitado, validar que el monto sea mayor a 0
            if (earlyPaymentDiscountAmount === null || 
                earlyPaymentDiscountAmount === undefined || 
                earlyPaymentDiscountAmount === 0 ||
                (typeof earlyPaymentDiscountAmount === 'number' && earlyPaymentDiscountAmount <= 0)) {
                setError('early_payment_discount_amount', {
                    type: 'manual',
                    message: 'El valor del descuento debe ser mayor a 0.'
                })
            } else {
                clearErrors('early_payment_discount_amount')
            }
        } else {
            // Si está deshabilitado, limpiar el error
            clearErrors('early_payment_discount_amount')
        }
    }, [earlyPaymentDiscountEnabled, earlyPaymentDiscountAmount, setError, clearErrors])

    // Validación condicional para early_payment_discount_deadline
    useEffect(() => {
        if (earlyPaymentDiscountEnabled) {
            // Si está habilitado, validar que la fecha no sea null, undefined o vacía
            if (earlyPaymentDiscountDeadline === null || 
                earlyPaymentDiscountDeadline === undefined || 
                (typeof earlyPaymentDiscountDeadline === 'string' && earlyPaymentDiscountDeadline.trim() === '')) {
                setError('early_payment_discount_deadline', {
                    type: 'manual',
                    message: 'La fecha límite del descuento es requerida.'
                })
            } else {
                clearErrors('early_payment_discount_deadline')
            }
        } else {
            // Si está deshabilitado, limpiar el error
            clearErrors('early_payment_discount_deadline')
        }
    }, [earlyPaymentDiscountEnabled, earlyPaymentDiscountDeadline, setError, clearErrors])

    // Validación condicional para second_category_discount_amount
    useEffect(() => {
        if (secondCategoryDiscountEnabled) {
            // Si está habilitado, validar que el monto sea mayor a 0
            if (secondCategoryDiscountAmount === null || 
                secondCategoryDiscountAmount === undefined || 
                secondCategoryDiscountAmount === 0 ||
                (typeof secondCategoryDiscountAmount === 'number' && secondCategoryDiscountAmount <= 0)) {
                setError('second_category_discount_amount', {
                    type: 'manual',
                    message: 'El valor del descuento debe ser mayor a 0.'
                })
            } else {
                clearErrors('second_category_discount_amount')
            }
        } else {
            // Si está deshabilitado, limpiar el error
            clearErrors('second_category_discount_amount')
        }
    }, [secondCategoryDiscountEnabled, secondCategoryDiscountAmount, setError, clearErrors])

    // Resetear valores cuando se desactiva el switch principal de pagos
    useEffect(() => {
        if (!paymentsEnabled) {
            setValue('subscription_fee', 0)
            setValue('early_payment_discount_enabled', false)
            setValue('early_payment_discount_amount', 0)
            setValue('early_payment_discount_deadline', null)
            setValue('second_category_discount_enabled', false)
            setValue('second_category_discount_amount', 0)
            setValue('payment_information', '')
        }
    }, [paymentsEnabled, setValue])

    // Resetear valores cuando se desactiva el switch de Descuento por Pago Anticipado
    useEffect(() => {
        if (!earlyPaymentDiscountEnabled) {
            setValue('early_payment_discount_amount', 0)
            setValue('early_payment_discount_deadline', null)
        }
    }, [earlyPaymentDiscountEnabled, setValue])

    // Resetear valores cuando se desactiva el switch de Descuento por Segunda Categoría
    useEffect(() => {
        if (!secondCategoryDiscountEnabled) {
            setValue('second_category_discount_amount', 0)
        }
    }, [secondCategoryDiscountEnabled, setValue])

   
    const onSubmit = async () => {
        setIsSubmitting(true)
        setSubmitError(null)
        setSubmitSuccess(false)
      
        await trigger()
        if(!isValid) {
            setIsSubmitting(false)
            return
        }

        const formValues = getValues()
        const currentPaymentInfo = currentTournament?.payment || null
        const hasExistingPayment = currentPaymentInfo !== null

        const payload = {
            ...formValues,
            tournament_id: currentTournament.id
        }

        try {
            // Si ya existe un payment, actualizar (PUT), si no, crear (POST)
            const method = hasExistingPayment ? 'PUT' : 'POST'
            const response = await fetchApi(`/tournaments/${currentTournament.id}/payment/`, {
                method,
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const result = await response.json()
                if (result.data && currentTournament) {
                    updateTournament({ ...currentTournament, ...result.data, id:result.data.tournament })
                }
                toast.success(hasExistingPayment 
                    ? 'Configuración de pagos actualizada exitosamente' 
                    : 'Configuración de pagos creada exitosamente')
                setSubmitSuccess(true)
            } else {
                const errorData = await response.json()
                setSubmitError(errorData.message || `Error al ${hasExistingPayment ? 'actualizar' : 'crear'} la configuración de pagos`)
            }
        } catch (error) {
            setSubmitError('Error al conectar con el servidor')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <div className='flex items-center gap-4 mbe-6'>
                            <CustomAvatar skin='light' color='primary' variant='rounded' size={50}>
                                <i className='tabler-currency-dollar text-3xl' />
                            </CustomAvatar>
                            <div>
                                <Typography variant='h5'>Pagos del Torneo</Typography>
                                <Typography variant='body2'>Configura las opciones de pago e inscripción</Typography>
                            </div>
                        </div>

                        <Divider className='mbe-6' />

                        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
                            {submitError && (
                                <Alert severity='error' onClose={() => setSubmitError(null)}>
                                    {submitError}
                                </Alert>
                            )}

                            {/* Toggle principal */}
                            <div className='flex flex-col gap-4'>
                                <Controller
                                    name='is_active'
                                    control={control}
                                    render={({ field }) => (
                                        <PaymentToggle value={field.value || false} onChange={field.onChange} />
                                    )}
                                />
                            </div>

                            {/* Campos condicionales cuando payments_enabled está activo */}
                            {paymentsEnabled && (
                                <>
                                    <Divider />

                                    {/* Tarifa de entrada */}
                                    <div className='flex flex-col gap-4'>
                                        <Typography variant='h6'>Tarifa de Inscripción</Typography>
                                        <Grid container spacing={4}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Controller
                                                    name='subscription_fee'
                                                    control={control}
                                                    render={({ field }) => (
                                                        <CurrencyField
                                                            {...field}
                                                            value={field.value ?? undefined}
                                                            onChange={(value) => field.onChange(value ?? null)}
                                                            fullWidth
                                                            label='Tarifa de entrada'
                                                            placeholder='$0.00'
                                                            error={!!errors.subscription_fee}
                                                            helperText={errors.subscription_fee?.message}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <Divider />

                                    {/* Descuento por pago anticipado */}
                                    <div className='flex flex-col gap-4'>
                                        <Typography variant='h6'>Descuento por Pago Anticipado</Typography>
                                        <EarlyPaymentDiscount control={control} errors={errors} />
                                    </div>

                                    <Divider />

                                    {/* Descuento por segunda categoría */}
                                    <div className='flex flex-col gap-4'>
                                        <Typography variant='h6'>Descuento por Segunda Categoría</Typography>
                                        <SecondCategoryDiscount control={control} errors={errors} />
                                    </div>

                                    <Divider />
                                     {/* Editor de texto enriquecido */}
                                     <div className='flex flex-col gap-4'>
                                        <Typography variant='h6'>Descripción de Pagos</Typography>
                                        <Typography variant='body2' color='text.secondary' className='mbe-2'>
                                            Proporciona información sobre los pagos e inscripciones
                                        </Typography>
                                        <Controller
                                            name='payment_information'
                                            control={control}
                                            render={({ field }) => (
                                                <PaymentDescriptionEditor
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                    error={!!errors.payment_information}
                                                    helperText={errors.payment_information?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                </>
                            )}

                            <Divider />

                            {/* Botones de Acción */}
                            <div className='flex justify-end gap-4'>
                                <Button onClick={onSubmit} variant='contained' type='button' disabled={isSubmitting}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default PaymentsTab
