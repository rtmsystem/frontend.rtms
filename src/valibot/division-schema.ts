import { object, string, pipe, minLength, optional, nullable, number, boolean } from 'valibot'

const DivisionSchema = object({
  name: pipe(string(), minLength(1, 'Este campo es requerido')),
  description: optional(string()),
  format: pipe(string(), minLength(1, 'Este campo es requerido')),
  max_participants: optional(nullable(number())),
  gender: pipe(string(), minLength(1, 'Este campo es requerido')),
  participant_type: pipe(string(), minLength(1, 'Este campo es requerido')),
  born_after:optional(nullable(pipe(string()))),
  is_active: pipe(boolean()),
})

export default DivisionSchema
