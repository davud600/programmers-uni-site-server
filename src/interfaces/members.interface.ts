export interface Member {
  id: number;
  discord_username: string;
  is_member: boolean; // bool: 0 / 1
  last_paid: string;
  warned_about_payment: boolean; // 0 / 1
}
