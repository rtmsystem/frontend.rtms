import { Player } from "./playerTypes"


export type Set = {
    id: number
    match: number
    player1: number
    player2: number
    score: number
}

export interface Match {
    id: number
    match_code: string
    division: number
    division_name: string
    tournament_name: string
    player1: Player
    player2: Player
    partner1: Player | null
    partner2: Player | null
    match_type: "doubles" | "singles"
    status: "pending" | "in_progress" | "completed" | "cancelled"
    max_sets: number
    points_per_set: number
    round_number: number
    is_losers_bracket: boolean
    next_match: Match | null
    winner: Player | null
    winner_partner: Player | null
    scheduled_at: string | null
    started_at: string | null
    completed_at: string | null
    sets: Set[]
    sets_to_win: number
    sets_won_by_player1: number
    sets_won_by_player2: number
    notes: string
    created_by: number
    created_at: string
    updated_at: string
}