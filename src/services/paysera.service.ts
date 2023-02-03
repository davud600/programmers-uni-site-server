import {
  PAYSERA_API_LINK,
  PAYSERA_PROJECT_PASSWORD,
  PAYSERA_PROJECT_ID,
} from '@/config';
import md5 from 'md5';
import fetch from 'node-fetch';

interface CheckoutParams {
  p_email: string;
}

export default class PayseraService {
  public static async checkout(params: CheckoutParams): Promise<void> {
    const options = {
      projectid: PAYSERA_PROJECT_ID,
      amount: '1000', // in cents
      currency: 'EUR',
      orderid: '123123',
      ...params,
    };

    const urlParams = new URLSearchParams(options).toString();

    const encodedParams = Buffer.from(urlParams).toString('base64url');

    const sign = md5(`${encodedParams}${PAYSERA_PROJECT_PASSWORD}`);

    console.log(`urlParams: ${urlParams}`);
    console.log(`sign: ${sign}`);

    try {
      await fetch(`${PAYSERA_API_LINK}/${sign}`);
    } catch (error) {
      console.error(error);
    }
  }
}
