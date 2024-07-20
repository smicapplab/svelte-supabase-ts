export interface DatabaseProfile {
  id: string;
  user_id: string;
  updated_at: string;
  created_at: string;
  full_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  avatar_url: string;
  mobile_number: string;
  phone: string;
  username: string;
  website: string;
}

export type Profile = CamelCaseKeys<DatabaseProfile>;
