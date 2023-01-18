export interface Member {
  discord_username: string;
  in_server: boolean; // bool: 0 / 1
  last_paid: string;
  warned_about_payment: boolean; // 0 / 1
}
