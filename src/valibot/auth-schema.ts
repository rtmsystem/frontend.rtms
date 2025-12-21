import { object, string, pipe, minLength, email, nonEmpty } from 'valibot'

export const loginSchema = object({
  email: pipe(string(), minLength(1, 'Este campo es requerido'), email('Email inválido')),
  password: pipe(
    string(),
    nonEmpty('Este campo es requerido'),
    minLength(5, 'La contraseña debe tener al menos 5 caracteres')
  )
})

export const registerSchema = object({
  email: pipe(string(), minLength(1, 'Este campo es requerido'), email('Email inválido')),
  password: pipe(
    string(),
    nonEmpty('Este campo es requerido'),
    minLength(5, 'La contraseña debe tener al menos 5 caracteres')
  )
})

