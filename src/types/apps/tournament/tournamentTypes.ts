export type TournamentHeaderType = {
  name: string
  logo: string
  location: string
  organizer: string
  startDate: string
  endDate: string
  coverImg: string
}

export type TournamentType = {
  logo: string;
  coverImg: string;
  address: string;
  city: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  country: string;
  created_at: string;
  created_by_name: string;
  description: string;
  division_count: number;
  divisions: Division[];
  end_date: string;
  id: number;
  is_active: boolean;
  is_ongoing: boolean;
  is_registration_open: boolean;
  is_upcoming: boolean;
  name: string;
  organization: number;
  organization_name: string;
  postal_code: string | null;
  registration_deadline: string;
  start_date: string;
  state: string | null;
  status: 'draft' | 'published' | 'cancelled'; // ajusta según los posibles valores
  street_location: string;
  street_number: string;
  updated_at: string;
}

export type DataType = {
  home: string
}

export type Data = {
  users: DataType
  tournamentHeaderType: TournamentHeaderType
}

export interface TournamentResponse {
  success: boolean;
  message: string;
  data: Tournament;
}

export interface Payment {
  payment_information: string;
  early_payment_discount_amount: number;
  early_payment_discount_deadline: string;
  second_category_discount_amount: number;
  subscription_fee: number;
  is_active: boolean;
}

export interface Tournament {
  payment: Payment | null;
  id: number;
  name: string;
  description: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  registration_deadline: string; // ISO date string
  address: string;
  street_number: string;
  street_location: string;
  city: string;
  state: string | null;
  country: string;
  postal_code: string | null;
  organization: number;
  organization_name: string;
  organization_logo: string;
  status: "draft" | "published" | "completed" | "in_progress" | "cancelled";
  is_active: boolean;
  division_count: number;
  is_registration_open: boolean;
  is_upcoming: boolean;
  is_ongoing: boolean;
  divisions: Division[];
  created_by_name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  logo: string;
  banner: string | null;
}

export interface Division {
  id: number;
  name: string;
  description: string;
  format: "knockout" | "league" | "round_robin" | string; // ajusta si hay más formatos
  max_participants: number;
  gender: "male" | "female" | "any";
  participant_type: "single" | "doubles";
  born_after: string | null; // ISO date string
  is_active: boolean;
  participant_count: number;
  is_full: boolean;
  spots_remaining: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  is_published: boolean;
}