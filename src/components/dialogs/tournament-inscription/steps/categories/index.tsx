
import Grid from "@mui/material/Grid2"
import { useTournament } from "@/contexts/TournamentContext"
import { useState } from "react"
import { Box, Checkbox, Chip, styled, useMediaQuery, useTheme } from "@mui/material"
import Typography from "@mui/material/Typography"
import TournamentDivisionCard from "@/components/tournament-division"
import classnames from "classnames"
import PartnerInfo from "./PartnerInfo"
import { useFieldArray, useFormContext } from "react-hook-form"
import { playerProfileSchema } from "@/valibot/player-profile-schema"
import { InferInput } from "valibot"
import { useEffect, useMemo } from "react"

const Root = styled('div', {
    name: 'MuiCustomInputHorizontal',
    slot: 'root'
})(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1),
    borderRadius: 'var(--mui-shape-borderRadius)',
    cursor: 'pointer',
    position: 'relative',
    border: '1px solid var(--mui-palette-customColors-inputBorder)',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    '&.active': {
        border: '2px solid var(--mui-palette-primary-main)',
        '& i, & svg': {
            color: 'var(--mui-palette-primary-main) !important',
        }
    },
    '&.disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
        // border: '1px solid var(--mui-palette-warning-main)',
        '& i, & svg': {
            color: 'var(--mui-palette-text-disabled) !important'
        }
    }
}))


type FormData = InferInput<typeof playerProfileSchema>

interface CategoriesStepProps {
    setIsNextDisabled: (value: boolean) => void
}

interface CategoryPrice {
    originalPrice: number
    finalPrice: number
    hasEarlyDiscount: boolean
}

const CategoriesStep = ({ setIsNextDisabled }: CategoriesStepProps) => {


    const tournament = useTournament()
    const divisions = tournament?.tournament?.divisions.filter(division => division.is_active) || []
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { control, formState: { errors } } = useFormContext<FormData>()
    const payment = tournament?.tournament?.payment

    const { fields, append, remove } = useFieldArray({
        control: control,
        name: "involvements",
    })

    useEffect(() => {
        if (fields.length === 0) {
            setIsNextDisabled(true)
        } else {
            setIsNextDisabled(false)
        }
    }, [fields])

    const [selected, setSelected] = useState<string[]>(fields.map(field => field.division_id.toString()))

    // Función para formatear moneda
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    // Memoizar precios de todas las categorías
    const categoryPrices = useMemo(() => {
        if (!payment) {
            return {} as Record<number, CategoryPrice | null>
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

        // Verifica si una categoría debe tener descuento de segunda categoría
        // Se aplica a: categorías no seleccionadas cuando hay al menos 1 seleccionada, 
        // o a categorías seleccionadas que no son la primera
        const isSecondCategory = (divisionId: number): boolean => {
            if (selected.length === 0) return false
            
            const divisionIdNum = Number(divisionId)
            const isSelected = selected.includes(divisionId.toString())
            
            // Si la categoría no está seleccionada y hay al menos una seleccionada
            // entonces es una categoría "restante" que debe tener el descuento
            if (!isSelected && selected.length > 0) {
                return true
            }
            
            // Si está seleccionada, verificar si no es la primera
            if (isSelected) {
                const selectedIds = selected.map(id => Number(id)).sort((a, b) => a - b)
                const firstSelectedId = selectedIds[0]
                return divisionIdNum !== firstSelectedId
            }
            
            return false
        }

        const subscriptionFee = payment.subscription_fee || 0
        const secondCategoryDiscount = payment.second_category_discount_amount || 0
        const earlyPaymentDiscount = payment.early_payment_discount_amount || 0
        const hasEarlyDiscount = isEarlyPaymentDiscountApplicable() && earlyPaymentDiscount > 0

        const prices: Record<number, CategoryPrice | null> = {}
        divisions.forEach(division => {
            // El precio original siempre es subscription_fee
            // El precio final se calcula aplicando los descuentos
            let finalPrice = subscriptionFee

            // Aplicar descuento por segunda categoría si aplica
            if (isSecondCategory(division.id) && secondCategoryDiscount > 0) {
                finalPrice = subscriptionFee - secondCategoryDiscount
            }

            // Aplicar descuento por pago adelantado si aplica
            if (hasEarlyDiscount) {
                finalPrice = finalPrice - earlyPaymentDiscount
            }

            prices[division.id] = {
                originalPrice: subscriptionFee,
                finalPrice: finalPrice > 0 ? finalPrice : 0,
                hasEarlyDiscount
            }
        })
        return prices
    }, [selected, payment, divisions])

    const handleChange = async (value: string) => {
        if (selected.includes(value)) {
            const updatedArr = selected.filter(item => item !== value)
            setSelected(updatedArr)
            const indexToRemove = fields.findIndex(field => field.division_id === Number(value))
            remove(indexToRemove)
        } else {
            setSelected([...selected, value])
            const division = divisions.find(d => d.id === Number(value))
            const isDoubles = division?.participant_type === 'doubles'
            append({
                division_id: Number(value),
                partner_first_name: isDoubles ? '' : 'undefined',
                partner_last_name: isDoubles ? '' : 'undefined',
                partner_email: isDoubles ? '' : 'undefined@example.com',
                is_doubles: division?.participant_type === 'doubles'
            })
        }
        setIsNextDisabled(fields.length === 0)
    }

    return (
        <Box className='flex flex-col gap-4 w-full'>
            {
                isMobile && (
                    <div className='flex flex-col gap-1'>
                        <Typography variant='h5'>Categorías</Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Selecciona las categorías en las que deseas participar
                        </Typography>
                    </div>
                )
            }

            <Grid className='flex flex-col gap-4 w-full' container spacing={12}>
                {divisions.map((item, index) => {
                    const isDoubles = item.participant_type === 'doubles'
                    const isSelected = selected.includes(item.id.toString())

                    return <Root key={item.id} className={classnames({
                        active: selected.includes(item.id.toString()),
                        disabled: item.is_published
                    })}>
                        <Checkbox
                            disabled={item.is_published}
                            sx={{
                                marginRight: 2,
                                width: 40,
                                height: 40,
                            }}
                            color="primary"
                            size="medium"
                            checked={selected.includes(item.id.toString())}
                            onChange={() => handleChange(item.id.toString())}
                        />
                        <div className='flex flex-1 flex-col gap-2 w-full'>
                            <div className='flex items-center justify-between w-full'>
                                <Typography className='font-medium' color='text.primary' variant='h6'>{item.name}</Typography>
                                {
                                    item.is_published ?
                                        <Chip icon={<i color="warning" className='tabler-lock text-base  text-orange-700' />} className='border-orange-700 text-bold text-orange-700' variant="outlined" size="small"   label='Inscripción cerrada'   />
                                        : payment !== null && categoryPrices[item.id] ? (
                                            <div className='flex flex-col items-center gap-2'>
                                                {categoryPrices[item.id]?.hasEarlyDiscount ? (
                                                    <>
                                                        <Typography className='line-through' variant='h6' color='text.secondary'>
                                                            {formatCurrency(categoryPrices[item.id]!.originalPrice)}
                                                        </Typography>
                                                        <Typography variant='h6' color='text.primary' fontWeight='bold'>
                                                            {formatCurrency(categoryPrices[item.id]!.finalPrice)}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography variant='h6' color='text.primary' fontWeight='bold'>
                                                        {formatCurrency(categoryPrices[item.id]!.finalPrice)}
                                                    </Typography>
                                                )}
                                            </div>
                                        ) : null
                                }

                            </div>
                            <TournamentDivisionCard paymentEnabled={tournament.tournament.payment !== null} division={item} />
                            {isDoubles && isSelected && (
                                <PartnerInfo
                                    control={control}
                                    errors={errors}
                                    index={fields.findIndex(field => field.division_id === item.id)}
                                />
                            )}
                        </div>
                    </Root>
                })}
            </Grid>

        </Box>

    )
}

export default CategoriesStep