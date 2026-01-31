import { useMemo, useState } from "react"
import { Involvement } from "@/types/apps/tournament/involvementTypes"
import Grid from "@mui/material/Grid2"
import PlayerPublicCard from "./PublicPlayerCard"
import EmptyState from "@/components/EmptyState"
import SelectDropdown from "@/components/layout/shared/SelectDropdown"
import { useTournament } from "@/contexts/TournamentContext"

type PublicPlayerContentProps = {
    involvements: Involvement[]
}

const PublicPlayerContent = ({ involvements }: PublicPlayerContentProps) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
    const tournament = useTournament()
    const divisions = tournament?.tournament?.divisions || []

    // Filtrar involvements por la categoría seleccionada
    const filteredInvolvements = useMemo(() => {
        if (!divisions.length || !divisions[selectedCategoryIndex]) {
            return involvements
        }

        const selectedDivision = divisions[selectedCategoryIndex]
        return involvements.filter(
            involvement => involvement.division === selectedDivision.id ||
                          involvement.division_id === selectedDivision.id
        )
    }, [involvements, divisions, selectedCategoryIndex])

    return (
        <Grid container spacing={{ xs: 3, md: 6 }}>
            <Grid className="flex w-full justify-end" size={{ xs: 12 }}>
                <SelectDropdown
                    selectedIndex={selectedCategoryIndex}
                    onSelectionChange={setSelectedCategoryIndex}
                />
            </Grid>

            {filteredInvolvements?.length > 0 ? (
                filteredInvolvements.map((involvement, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={involvement.id}>
                        <PlayerPublicCard index={index} involvement={involvement} />
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