'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { Box, Typography, useTheme, useMediaQuery, Button, Card, CardContent, Alert, Divider } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { InferInput } from 'valibot'
import { playerProfileSchema } from '@/valibot/player-profile-schema'
import { useTournament } from '@/contexts/TournamentContext'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'

type FormData = InferInput<typeof playerProfileSchema>

interface PaymentStepProps {
    setIsNextDisabled: (value: boolean) => void
}

interface CategoryPrice {
    originalPrice: number
    finalPrice: number
    hasEarlyDiscount: boolean
}

const PaymentStep = ({ setIsNextDisabled }: PaymentStepProps) => {
    const { control, watch } = useFormContext<FormData>()
    const tournament = useTournament()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const paymentFile = watch('payment_file')
    const involvements = watch('involvements') || []
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const payment = tournament?.tournament?.payment
    const paymentInformation = payment?.payment_information || ''
    const divisions = tournament?.tournament?.divisions.filter(division => division.is_active) || []

    // Función para formatear moneda
    const formatCurrency = (amount: number | string | null | undefined): string => {
        const numAmount = Number(amount) || 0
        if (isNaN(numAmount)) return '$0'
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numAmount)
    }

    // Calcular resumen de pago basado en categorías seleccionadas
    const paymentSummary = useMemo(() => {
        if (!payment || involvements.length === 0) {
            return {
                items: [],
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
            const division = divisions.find(d => d.id === involvement.division_id)
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
                divisionName: division.name,
                originalPrice: Number(subscriptionFee),
                finalPrice: Number(finalPrice) > 0 ? Number(finalPrice) : 0,
                discount: Number(discount),
                hasEarlyDiscount
            }
        }).filter(item => item !== null) as Array<{
            divisionName: string
            originalPrice: number
            finalPrice: number
            discount: number
            hasEarlyDiscount: boolean
        }>

        const subtotal = items.reduce((sum, item) => Number(sum) + Number(item.originalPrice), 0)
        const totalDiscount = items.reduce((sum, item) => Number(sum) + Number(item.discount), 0)
        const total = items.reduce((sum, item) => Number(sum) + Number(item.finalPrice), 0)

        return {
            items,
            subtotal: Number(subtotal) || 0,
            totalDiscount: Number(totalDiscount) || 0,
            total: Number(total) || 0
        }
    }, [involvements, payment, divisions])

    useEffect(() => {
        if (!paymentFile) {
            setIsNextDisabled(true)
            setFileName(null)
        } else {
            setIsNextDisabled(false)
            if (paymentFile instanceof File) {
                setFileName(paymentFile.name)
            }
        }
    }, [paymentFile, setIsNextDisabled])

    const handleFileChange = (onChange: (file: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onChange(file)
            setFileName(file.name)
        }
    }

    const handleRemoveFile = (onChange: (file: File | null) => void) => () => {
        onChange(null)
        setFileName(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <Box className='flex flex-col gap-4 w-full'>
            {isMobile && (
                <div className='flex flex-col gap-1'>
                    <Typography variant='h5'>Pago</Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Adjunta el comprobante de pago para continuar
                    </Typography>
                </div>
            )}

            {/* Resumen de pago */}
            {paymentSummary.items.length > 0 && (
                <Card>
                    <CardContent>
                        <Typography variant='h6' className='mb-4'>
                            Resumen de Pago
                        </Typography>
                        <Box className='flex flex-col gap-3'>
                            {paymentSummary.items.map((item, index) => (
                                <Box key={index} className='flex flex-col gap-1'>
                                    <Box className='flex justify-between items-start'>
                                        <Typography variant='body1' fontWeight='medium'>
                                            {item.divisionName}
                                        </Typography>
                                        <Box className='flex flex-col items-end'>
                                            {item.hasEarlyDiscount && item.discount > 0 ? (
                                                <>
                                                    <Typography 
                                                        variant='body2' 
                                                        className='line-through' 
                                                        color='text.secondary'
                                                    >
                                                        {formatCurrency(item.originalPrice)}
                                                    </Typography>
                                                    <Typography variant='body1' fontWeight='bold' color='primary'>
                                                        {formatCurrency(item.finalPrice)}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography variant='body1' fontWeight='bold'>
                                                    {formatCurrency(item.finalPrice)}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                    {item.discount > 0 && (
                                        <Typography variant='caption' color='success.main'>
                                            Descuento aplicado: {formatCurrency(item.discount)}
                                        </Typography>
                                    )}
                                    {index < paymentSummary.items.length - 1 && (
                                        <Divider className='mt-2' />
                                    )}
                                </Box>
                            ))}
                            <Divider className='my-2' />
                            <Box className='flex justify-between items-center'>
                                <Typography variant='body1' fontWeight='medium'>
                                    Subtotal
                                </Typography>
                                <Typography variant='body1'>
                                    {formatCurrency(paymentSummary.subtotal)}
                                </Typography>
                            </Box>
                            {paymentSummary.totalDiscount > 0 && (
                                <Box className='flex justify-between items-center'>
                                    <Typography variant='body1' color='success.main'>
                                        Descuentos
                                    </Typography>
                                    <Typography variant='body1' color='success.main' fontWeight='bold'>
                                        -{formatCurrency(paymentSummary.totalDiscount)}
                                    </Typography>
                                </Box>
                            )}
                            <Divider className='my-2' />
                            <Box className='flex justify-between items-center'>
                                <Typography variant='h6' fontWeight='bold'>
                                    Total a Pagar
                                </Typography>
                                <Typography variant='h6' fontWeight='bold' color='primary'>
                                    {formatCurrency(paymentSummary.total)}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}

            {paymentInformation && (
                <Card>
                    <CardContent>
                        <Typography variant='h6' className='mb-4'>
                            Información de Pago
                        </Typography>
                        <Box
                            className='prose prose-sm max-w-none'
                            dangerouslySetInnerHTML={{ __html: paymentInformation }}
                            sx={{
                                '& p': {
                                    marginBottom: 2,
                                },
                                '& ul, & ol': {
                                    paddingLeft: 3,
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12 }}>
                            <Typography variant='h6' className='mb-2'>
                                Comprobante de Pago
                            </Typography>
                            <Typography variant='body2' color='text.secondary' className='mb-4'>
                                Por favor, adjunta el comprobante de pago para completar tu inscripción
                            </Typography>

                            <Controller
                                name='payment_file'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <Box className='flex flex-col gap-4'>
                                        <input
                                            ref={fileInputRef}
                                            accept='.pdf,.jpg,.jpeg,.png'
                                            className='hidden'
                                            id='payment-file-upload'
                                            type='file'
                                            onChange={handleFileChange(onChange)}
                                        />
                                        <Box className='flex items-center gap-4'>
                                            <Button
                                                variant='outlined'
                                                onClick={() => fileInputRef.current?.click()}
                                                startIcon={<i className='tabler-upload' />}
                                            >
                                                Seleccionar Archivo
                                            </Button>
                                            {fileName && (
                                                <Box className='flex items-center gap-2'>
                                                    <Typography variant='body2' color='text.primary'>
                                                        {fileName}
                                                    </Typography>
                                                    <IconButton
                                                        size='small'
                                                        onClick={handleRemoveFile(onChange)}
                                                        color='error'
                                                    >
                                                        <i className='tabler-x' />
                                                    </IconButton>
                                                </Box>
                                            )}
                                        </Box>
                                        {!paymentFile && (
                                            <Alert severity='info'>
                                                Debes adjuntar un comprobante de pago para continuar con la inscripción.
                                            </Alert>
                                        )}
                                        {paymentFile && (
                                            <Alert severity='success'>
                                                Archivo adjuntado correctamente. Puedes continuar al siguiente paso.
                                            </Alert>
                                        )}
                                    </Box>
                                )}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default PaymentStep

