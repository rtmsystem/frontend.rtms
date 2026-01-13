import { object, string, pipe, forward, boolean, custom, minLength, email, optional, nullable, date, number, minValue, transform, union, null_, array, check, any } from 'valibot'

export const playerProfileSchema = object({
  // Required fields
  first_name: pipe(string(), minLength(1, 'Este campo es requerido')),
  last_name: pipe(string(), minLength(1, 'Este campo es requerido')),
  second_last_name: optional(nullable(string())),
  gender: pipe(string(), minLength(1, 'Este campo es requerido')),
  nationality: object({
    id: number(),
    name: string(),
    phone_code: string(),
    flag: string(),
  }),
  email: pipe(string(), minLength(1, 'Este campo es requerido'), email('Email inválido')),

  // Optional fields
  middle_name: optional(nullable(string())),
  date_of_birth: pipe(date()),
  phone: pipe(string(), minLength(1, 'Este campo es requerido')),
  // document_type: optional(nullable(string())),
  // document_number: optional(nullable(string())),
  // street_number: optional(nullable(string())),
  // street_location: optional(nullable(string())),
  // city: optional(nullable(string())),
  // state: optional(nullable(string())),
  // country: optional(nullable(string())),
  // postal_code: optional(nullable(string())),
  // full_address: optional(nullable(string())),
  height_cm: pipe(
    optional(union([string(), number(), null_()])),
    transform((input) => {
      if (input === null || input === undefined || input === '') {
        return 0 // Retornar 0 para que falle minValue con el mensaje personalizado "Este campo es requerido"
      }
      const num = typeof input === 'number' ? input : Number(input)
      return isNaN(num) ? 0 : num
    }),
    number(),
    minValue(1, 'Este campo es requerido')
  ),
  weight_kg: pipe(
    optional(union([string(), number(), null_()])),
    transform((input) => {
      if (input === null || input === undefined || input === '') {
        return 0 // Retornar 0 para que falle minValue con el mensaje personalizado "Este campo es requerido"
      }
      const num = typeof input === 'number' ? input : Number(input)
      return isNaN(num) ? 0 : num
    }),
    number(),
    minValue(1, 'Este campo es requerido')
  ), //allow nullable
  handedness: pipe(string(), minLength(1, 'Este campo es requerido')),
  shirt_size: pipe(string(), minLength(1, 'Este campo es requerido')),
  emergency_contact_first_name: pipe(string(), minLength(1, 'Este campo es requerido')),
  emergency_contact_last_name: pipe(string(), minLength(1, 'Este campo es requerido')),
  emergency_contact_phone: pipe(string(), minLength(1, 'Este campo es requerido')),
  emergency_contact_relationship: pipe(string(), minLength(1, 'Este campo es requerido')),

  // Medical Information
  health_insurance: pipe(string(), minLength(1, 'Este campo es requerido')),
  blood_type: pipe(string(), minLength(1, 'Este campo es requerido')),
  medical_conditions: optional(nullable(string())),

  // Campos opcionales para compañeros de dobles (se validan condicionalmente en el componente)
  involvements:
    array(object({
      division_id: number(),
      is_doubles: optional(boolean(), false),
      partner_first_name: pipe(string(), minLength(1, 'Este campo es requerido')),
      partner_last_name: pipe(string(), minLength(1, 'Este campo es requerido')),
      partner_email: pipe(string(), minLength(1, 'Este campo es requerido'), email('Email inválido')),
    })),
  privacy_policy_accepted: pipe(boolean()),
  terms_conditions_accepted: pipe(boolean()),
  avatar: optional(nullable(union([any(), string()]))),
  payment_file: optional(nullable(union([any(), string()]))),
  payment_method: optional(nullable(string())),
  //   custom((involvements: any) => {
  //     for (const inv of involvements) {
  //       if (inv.is_doubles) {
  //         // Validar partner_name
  //         if (!inv.partner_name || inv.partner_name.trim() === '') {
  //           return false;
  //         }
  //         // Validar partner_email
  //         if (!inv.partner_email || inv.partner_email.trim() === '') {
  //           return false;
  //         }
  //         // Validar formato de email
  //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //         if (!emailRegex.test(inv.partner_email)) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   }, 'Los datos del compañero son requeridos para categorías de dobles')
  // )

})
