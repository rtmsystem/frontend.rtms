import { object, string, pipe, minLength, email, optional, nullable, date, array, number, minValue, boolean } from 'valibot'

const TournamentSchema = object({
    logo: optional(nullable(string())),
    name: pipe(string(), minLength(1, 'Este campo es requerido')),
    description: optional(string()),
    contact_name: pipe(string(), minLength(1, 'Este campo es requerido')),
    contact_phone: pipe(string(), minLength(1, 'Este campo es requerido')),
    contact_email: pipe(string(), minLength(1, 'Este campo es requerido'), email('Email inválido')),
    start_date: pipe(date()),
    end_date: pipe(date()),
    registration_deadline: pipe(date()),
    address: pipe(string(), minLength(1, 'Este campo es requerido')),
    street_number: pipe(string(), minLength(1, 'Este campo es requerido')),
    street_location: pipe(string(), minLength(1, 'Este campo es requerido')),
    city: pipe(string(), minLength(1, 'Este campo es requerido')),
    state: optional(nullable(string())),
    country: pipe(string(), minLength(1, 'Este campo es requerido')),
    postal_code: optional(nullable(string())),
    divisions: array(object({
        name: pipe(string(), minLength(1, 'Este campo es requerido')),
        description: optional(string()),
        format: pipe(string(), minLength(1, 'Este campo es requerido')),
        max_participants: optional(nullable(number())),
        gender: pipe(string(), minLength(1, 'Este campo es requerido')),
        participant_type: pipe(string(), minLength(1, 'Este campo es requerido')),
        born_after: optional(nullable(pipe(string()))),
        is_active: pipe(boolean()),
    })),
  })

export default TournamentSchema