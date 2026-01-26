export const ensurePrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str : `${prefix}${str}`)
export const withoutSuffix = (str: string, suffix: string) =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
export const withoutPrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const monthsFull = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export const formatDate = (dateString: string, format: string = 'DD MMM YYYY'): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const day = date.getDate()
  const dayOfWeek = date.getDay()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const format12Hour = (h: number) => {
    if (h === 0) return 12
    if (h > 12) return h - 12
    return h
  }

  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hour12 = format12Hour(hours)
  const minutesStr = minutes.toString().padStart(2, '0')

  let formatted = format
    .replace('dddd', days[dayOfWeek])
    .replace('MMMM', monthsFull[month])
    .replace('MMM', months[month])
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('MM', (month + 1).toString().padStart(2, '0'))
    // .replace('YY', year.toString().slice(-2))
    .replace('YYYY', year.toString())
    .replace('hh', hour12.toString().padStart(2, '0'))
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutesStr)
    .replace('A', ampm)

  return formatted
}
