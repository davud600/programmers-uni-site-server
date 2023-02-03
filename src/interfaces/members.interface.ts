/*
  Interface for databse Member row
*/
export interface Member {
  id: number;
  discord_username: string;
  is_member: boolean;
  last_paid: string;
  warned_about_payment: boolean;
  email: string;
}
