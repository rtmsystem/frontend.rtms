

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
    player_email: string
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
}


export type ParticipantType = 'single' | 'doubles'