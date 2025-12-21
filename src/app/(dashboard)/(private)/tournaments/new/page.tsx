import NewTournament from "@/views/apps/tournament/new"
import AuthGuard from "@/hocs/AuthGuard"

const NewTournamentPage = () => {
    return (
        <AuthGuard>
            <NewTournament />
        </AuthGuard>
    )

}

export default NewTournamentPage