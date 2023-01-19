import { Payment } from '@/interfaces/payments.interface';
import { poolPromise } from '../databases/index';

const SOFT_DELTES = false;

export default class PaymentService {
  public static async save(memberId: number, amount: number): Promise<void> {
    const paymentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = `INSERT INTO payments (member_id, payment_date, amount, created_at) VALUES ('${memberId}', '${paymentDate}', '${amount}', '${paymentDate}');`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }

  public static async findAll(): Promise<Array<Payment>> {
    const sql = `SELECT * FROM payments`;

    try {
      const [payments] = await poolPromise.execute(sql);
      return payments;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getPayment(id: any): Promise<Array<Payment>> {
    const sql = `SELECT * FROM payments WHERE id='${id}'`;

    try {
      const [[payment]] = await poolPromise.execute(sql);
      return payment;
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id: any): Promise<void> {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql = SOFT_DELTES
      ? `UDPATE payments SET deleted_at='${currentDate}' WHERE id='${id}'`
      : `DELETE FROM payments WHERE id='${id}'`;

    try {
      await poolPromise.execute(sql);
    } catch (error) {
      console.error(error);
    }
  }
}
