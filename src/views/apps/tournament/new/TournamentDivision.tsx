import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import { useFormContext } from 'react-hook-form'
import TournamentSchema from '@/valibot/tournament-schema'
import { InferInput } from 'valibot'
import { useFieldArray } from 'react-hook-form'
import TournamenteDivisonItem from "./TournamentDivisonItem"

type FormData = InferInput<typeof TournamentSchema>

const TournamentDivision = () => {
  const { control, formState: { errors } } = useFormContext<FormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "divisions",
  });

  const handleAddDivision = () => {
    append({
      name: '',
      description: '',
      format: '',
      max_participants: null,
      gender: '',
      participant_type: '',
      born_after: null,
      is_active: true,
    })
  }
  
  const handleRemoveStep = (index: number) => {
    remove(index)
  }

  return (
    <Card>
      <CardHeader title='Categorías'
        action={
          <Button onClick={handleAddDivision} size='small' variant='contained' startIcon={<i className='tabler-plus' />}>
            Agregar Categoría
          </Button>
        } />

      <CardContent>
        {
          fields.map((field, index) => (
            <TournamenteDivisonItem 
            remove={handleRemoveStep}
            key={field.id} 
            index={index} 
            control={control} 
            errors={errors} />
          ))
        }
      </CardContent>
    </Card>
  )
}

export default TournamentDivision