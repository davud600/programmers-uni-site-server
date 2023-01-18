import { NextFunction, Request, Response } from 'express';
import MembersModel from '@models/members.model';

export default class MembersController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const members = await MembersModel.findAll();

      res.status(200).send(members);
    } catch (error) {
      next(error);
    }
  };

  public createMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { discordUsername } = req.body;

      if (await MembersModel.getMember(discordUsername)) {
        res
          .status(400)
          .send('Member with given discord username already exists');
        return;
      }

      await MembersModel.save(discordUsername);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
