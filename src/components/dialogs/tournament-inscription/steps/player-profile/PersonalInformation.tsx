'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { InferInput } from 'valibot'
import { playerProfileSchema } from '@/valibot/player-profile-schema'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { useTournament } from '@/contexts/TournamentContext'
import PhoneField from '@core/components/custom-inputs/PhoneField'
import { CountryType } from '@/types/apps/geographical/countries'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'

type FormData = InferInput<typeof playerProfileSchema>

const PersonalInformation = () => {
    const { control, formState: { errors } } = useFormContext<FormData>()
    const { countries } = useTournament()

    return (
        <Card>
            <CardHeader title='Información Personal' />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller
                            name='first_name'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Nombre'
                                    placeholder='Ingrese el nombre'
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller
                            name='middle_name'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Segundo Nombre'
                                    placeholder='Ingrese el segundo nombre'
                                    error={!!errors.middle_name}
                                    helperText={errors.middle_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller
                            name='last_name'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Apellido'
                                    placeholder='Ingrese el apellido'
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller
                            name='second_last_name'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label='Segundo Apellido'
                                    placeholder='Ingrese el segundo apellido'
                                    error={!!errors.second_last_name}
                                    helperText={errors.second_last_name?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    type='email'
                                    label='Email'
                                    placeholder='Ingrese el email'
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => (
                                <PhoneField
                                    {...field}
                                    fullWidth
                                    label='Teléfono'
                                    placeholder='Ingrese el teléfono'
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    countries={countries}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name='gender'
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    select
                                    label='Género'
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                >
                                    <MenuItem value='male'>Masculino</MenuItem>
                                    <MenuItem value='female'>Femenino</MenuItem>
                                    <MenuItem value='other'>Otro</MenuItem>
                                </CustomTextField>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name='date_of_birth'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <AppReactDatepicker
                                    selected={value ? new Date(value) : null}
                                    showYearDropdown
                                    showMonthDropdown
                                    onChange={onChange}
                                    placeholderText='DD/MM/YYYY'
                                    customInput={
                                        <CustomTextField
                                            value={value}
                                            onChange={onChange}
                                            fullWidth
                                            label='Fecha de Nacimiento'
                                            {...(errors.date_of_birth && { error: true, helperText: 'Fecha inválida' })}
                                        />
                                    }
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name='nationality'
                            control={control}
                            render={({ field }) => (
                                <CustomAutocomplete
                                value={countries.find(country => country.phone_code === field.value.phone_code) || null}
                                onChange={(event, newValue) => {
                                    field.onChange({
                                        id: newValue?.id || 0,
                                        name: newValue?.name || '',
                                        phone_code: newValue?.phone_code || '',
                                        flag: newValue?.flag || ''
                                    })
                                }}
                                    autoHighlight
                                    id='autocomplete-country-select'
                                    options={countries as CountryType[]}
                                    getOptionLabel={option => option.name || ''}
                                    renderOption={(props, option) => {
                                        const { key, ...optionProps } = props as any
                                        return (
                                            <li className='flex w-full items-center gap-10' key={key} {...optionProps}>
                                                <div className='text-2xl mr-2'>{option.flag}</div>
                                                <div className='text-sm'>{option.name}</div>
                                            </li>
                                        )
                                    }}
                                    filterSelectedOptions={false}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    filterOptions={(options, { inputValue }) => {
                                        if (!inputValue) return options
                                        const normalizedInput = inputValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                        return options.filter((option) => {
                                            const normalizedName = option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                                            return normalizedName.includes(normalizedInput)
                                        })
                                    }}
                                    renderInput={params => (
                                        <CustomTextField
                                            {...params}
                                            label='Nacionalidad'
                                            placeholder='Seleccione la nacionalidad'
                                            error={!!errors.nationality}
                                            helperText={errors.nationality?.message}
                                            slotProps={{
                                                htmlInput: {
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password'
                                                }
                                            }}
                                        />
                                    )}
                                />
                            )}

                        />
                    </Grid>


                </Grid>
            </CardContent>
        </Card>
    )
}

export default PersonalInformation

