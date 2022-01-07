export interface DBUser {
  id: number;
  email: string;
  full_name: string;
  gender: string;
  phone: string;
  age: string;
  is_phone_verified?: boolean;
  updated_at?: string;
  created_at?: string;
}
