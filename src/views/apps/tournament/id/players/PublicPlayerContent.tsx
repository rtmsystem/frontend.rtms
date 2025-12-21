import { Involvement } from "@/types/apps/tournament/involvementTypes"
import Grid from "@mui/material/Grid2"
import PlayerPublicCard from "./PublicPlayerCard"
import EmptyState from "@/components/EmptyState"
import SelectDropdown from "@/components/layout/shared/SelectDropdown"
import { useState } from "react"

type PublicPlayerContentProps = {
    involvements: Involvement[]
}

const PublicPlayerContent = ({ involvements }: PublicPlayerContentProps) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
    return (
        <Grid container spacing={{ xs: 3, md: 6 }}>
            {/* <Grid className="flex w-full justify-between md:flex-nowrap flex-wrap  gap-4" size={{ xs: 12 }}>
            <SelectDropdown
                        selectedIndex={0}
                        onSelectionChange={() => {}}
                    />
            </Grid> */}
           
            {involvements?.length > 0 ? (
                involvements.map((involvement) => (
                    <Grid size={{ xs: 12, sm:6, md:6, lg:3 }} key={involvement.id} >
                        <PlayerPublicCard involvement={involvement} />
                    </Grid>
                ))
            ) : (
                <EmptyState
                    icon='tabler-users'
                    title='No hay Jugadores Registrados'
                    description='¡Mantente atento! Muy pronto publicaremos los jugadores que estarán compitiendo en el torneo.'
                />
            )}
            </Grid>
       
    )
}

export default PublicPlayerContent