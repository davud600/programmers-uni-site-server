import { NextFunction, Request, Response } from 'express';
import MembersModel from '@models/members.model';

class MembersController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const members = MembersModel.findAll();

      res.status(200).send(members);
    } catch (error) {
      next(error);
    }
  };

  public createMember = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    try {
      const { discordUsername } = req.body;

      if (MembersModel.getMember(discordUsername)) {
        res
          .status(400)
          .send('Member with given discord username already exists');
        return;
      }

      MembersModel.save(discordUsername);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default MembersController;
