import { object, optional, pipe, string, number, nullable, boolean, minValue, transform, union, null_ } from 'valibot'

export const paymentSchema = object({
  payment_information: optional(nullable(string())),
  subscription_fee:pipe(
    optional(union([string(), number(), null_()])),
    transform((input) => {
      if (input === null || input === undefined || input === '') {
        return 0 // Retornar 0 para que falle minValue con el mensaje personalizado "Este campo es requerido"
      }
      const num = typeof input === 'number' ? input : Number(input)
      return isNaN(num) ? 0 : num
    }),
    number(),
    minValue(1, 'El valor de la tarifa de inscripción debe ser mayor a 0')
  ),
  early_payment_discount_enabled: optional(boolean()),
  early_payment_discount_amount: pipe(
    optional(union([string(), number(), null_()])),
    transform((input) => {
      if (input === null || input === undefined || input === '') {
        return null
      }
      const num = typeof input === 'number' ? input : Number(input)
      return isNaN(num) ? null : num
    }),
    nullable(number())
  ),
  early_payment_discount_deadline: optional(nullable(string())),
  second_category_discount_enabled: optional(boolean()),
  second_category_discount_amount: pipe(
    optional(union([string(), number(), null_()])),
    transform((input) => {
      if (input === null || input === undefined || input === '') {
        return null
      }
      const num = typeof input === 'number' ? input : Number(input)
      return isNaN(num) ? null : num
    }),
    nullable(number())
  ),
  is_active: optional(boolean()),
})
