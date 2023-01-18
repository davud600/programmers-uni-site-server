import { NextFunction, Request, Response } from 'express';
import MembersModel from '@models/members.model';
import PaymentsModel from '@/models/payments.model';

const MILLISECONDS_IN_DAY = 86400000;
const MIN_DAYS_BEFORE_PAYING = 25;

export default class MemberPaymentController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { discordUsername, amount } = req.body;

      const member = await MembersModel.getMemberByDiscordUsername(
        discordUsername,
      );

      // request from client to make a new payment

      if (member) {
        // check if their last_paid is more than 25 days ago
        if (
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

        // save payment to db
        await PaymentsModel.save(member.id, amount);

        // update their last_paid to current date and warned_about_payment to false
        await MembersModel.setLastPaid(discordUsername);

        if (member.in_server == false) {
          // then respond with discord server invite link that expires after one click
        }
      } else {
        // process payment

        // save new user
        await MembersModel.save(discordUsername);

        // respond with discord invite link
      }

      res.status(200).send('Payment was successful!');
    } catch (error) {
      next(error);
    }
  };
}
