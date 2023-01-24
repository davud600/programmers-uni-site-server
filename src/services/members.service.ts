import { Member } from '@/interfaces/members.interface';
import { poolPromise } from '../databases/index';

const SOFT_DELTES = false;

const MAX_DAYS_WITHOUT_PAYING_WARNING = 28;
const MAX_DAYS_WITHOUT_PAYING = 32;

export default class MemberService {
  public static async save(discordUsername: string): Promise<Member> {
    const lastPaidDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const sql = `INSERT INTO members (discord_username, last_paid, created_at) VALUES ('${discordUsername}', '${lastPaidDate}', '${lastPaidDate}');`;

    try {
      await poolPromise.execute(sql);
      return await this.getMemberByDiscordUsername(discordUsername);
    } catch (error) {
      console.error(error);
    }
  }

  public static async findAll(): Promise<Array<Member>> {
    const sql = `SELECT * FROM members`;

    try {
      const [members] = await poolPromise.execute(sql);
      return members;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getMemberById(id: any): Promise<Member> {
    const sql = `SELECT * FROM members WHERE id='${id}'`;

    try {
      const [[member]] = await poolPromise.execute(sql);
      return member;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getMemberByDiscordUsername(
    discordUsername: string,
  ): Promise<Member> {
    const sql = `SELECT * FROM members WHERE discord_username='${discordUsername}'`;

    try {
      const [[member]] = await poolPromise.execute(sql);
      return member;
    } catch (error) {
      console.error(error);
    }
  }

  public static async renewMembership(discordUsername: string): Promise<void> {
    const lastPaidDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const sql = `UPDATE members SET last_paid='${lastPaidDate}', warned_about_payment='${0}', is_member=${true} WHERE discord_username='${discordUsername}'`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id: any): Promise<void> {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = SOFT_DELTES
      ? `UDPATE members SET deleted_at='${currentDate}' WHERE id='${id}'`
      : `DELETE FROM members WHERE id='${id}'`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }

  public static async deleteByDiscordUsername(
    discordUsername: string,
  ): Promise<void> {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = SOFT_DELTES
      ? `UDPATE members SET deleted_at='${currentDate}' WHERE discord_username='${discordUsername}'`
      : `DELETE FROM members WHERE discord_username='${discordUsername}'`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }

  public static async warnMember(id: string): Promise<void> {
    const sql = `UPDATE members SET warned_about_payment=${true} WHERE id='${id}'`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }

  public static async removeMember(id: string): Promise<void> {
    const sql = `UPDATE members SET warned_about_payment=${false}, is_member=${false} WHERE id='${id}'`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getMembersToWarn(): Promise<Member[]> {
    const sql = `SELECT * FROM members
  WHERE last_paid < DATE_SUB(CURDATE(), INTERVAL ${MAX_DAYS_WITHOUT_PAYING_WARNING} DAY) AND warned_about_payment=${false} AND is_member=${true}`;

    try {
      const [members] = await poolPromise.execute(sql);

      return members;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getMembersToRemove(): Promise<Member[]> {
    const sql = `SELECT * FROM members
  WHERE last_paid < DATE_SUB(CURDATE(), INTERVAL ${MAX_DAYS_WITHOUT_PAYING} DAY) AND warned_about_payment=${true} AND is_member=${true}`;

    try {
      const [members] = await poolPromise.execute(sql);

      return members;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getMembersToUpgrade(): Promise<Member[]> {
    const sql = `SELECT * FROM members WHERE last_paid > DATE_SUB(CURDATE(), INTERVAL ${MAX_DAYS_WITHOUT_PAYING_WARNING} DAY) AND is_member=${true}`;

    try {
      const [members] = await poolPromise.execute(sql);

      return members;
    } catch (error) {
      console.error(error);
    }
  }
}
