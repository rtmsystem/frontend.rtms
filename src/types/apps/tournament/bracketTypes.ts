import { Match } from "./matchTypes";

export interface Bracket {
    id: number | string;
    label: string;
    matches: Match[];
}

export interface Category {
    id: string | number;
    label: string;
    value: string;
}
