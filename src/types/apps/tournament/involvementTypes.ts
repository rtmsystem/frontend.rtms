

export type Involvement = {
    id: number
    tournament: number
    player: number
    partner: number
    division: number
    status: string
    paid: boolean
    tournament_name: string
    player_first_name: string
    player_last_name: string
    player_avatar: string
    official_avatar: string
    player_email: string
    player_gender: string
    partner_first_name: string
    participant_type: ParticipantType
    partner_last_name: string
    partner_avatar: string
    partner_email: string
    division_name: string
    created_at: string,
    nationality_name: string
    nationality_flag: string
    height_cm: number
    handedness: string
    knockout_points: string,
    division_id: number
}


export type ParticipantType = 'single' | 'doubles'