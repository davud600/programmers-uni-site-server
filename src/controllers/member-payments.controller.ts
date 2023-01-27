import { NextFunction, Request, Response } from 'express';
import MemberService from '@/services/members.service';
import PaymentService from '@/services/payments.service';
import { getDiscordInviteLink } from '@/utils/discord';
import { MemberPaymentDto } from '@/dtos/member-payment.dto';
import PayseraService from '@/services/paysera.service';

const MILLISECONDS_IN_DAY = 86400000;
const MIN_DAYS_BEFORE_PAYING = 25;
const amount = 10;

export default class MemberPaymentController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { discordUsername, email }: MemberPaymentDto = req.body;

      const member = await MemberService.getMemberByDiscordUsername(
        discordUsername,
      );

      // check if their last_paid is more than 25 days ago
      if (
        member &&
        Date.now() - Date.parse(member.last_paid) <
          MIN_DAYS_BEFORE_PAYING * MILLISECONDS_IN_DAY
      ) {
        res
          .status(400)
          .send(
            "Can't make payment because your last payment was less than 25 days ago!",
          );
        return;
      }

      // process payment
      PayseraService.checkout({ p_email: email });

      if (member) {
        await MemberService.renewMembership(discordUsername);
        await PaymentService.save(member.id, amount);

        res
          .status(200)
          .send('Payment was successful and your membership has been renewed!');
        return;
      }

      const newMember = await MemberService.save(discordUsername);
      await PaymentService.save(newMember.id, amount);

      res.status(200).send({ discordInviteLink: getDiscordInviteLink() });
      return;
    } catch (error) {
      next(error);
    }
  };
}
