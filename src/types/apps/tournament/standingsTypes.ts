export interface Standing {
    id: number;
    group: number;
    involvement: number;
    matches_played: number;
    matches_won: number;
    matches_lost: number;
    sets_won: number;
    sets_lost: number;
    sets_difference: number;
    points: number;
    position_in_group: number;
    global_position: number;
    player_name: string;
    partner_name: string | null;
    team_name: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}

export interface GroupStanding {
    id: number;
    division: number;
    name: string;
    group_number: number;
    participant_count: number;
    standings: Standing[];
}
