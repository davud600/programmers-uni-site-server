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

  public getMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const member = await MembersModel.getMemberById(id);

      res.status(200).send(member);
    } catch (error) {
      next(error);
    }
  };

  public getMemberByDiscordUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { discordUsername } = req.body;

      const member = await MembersModel.getMemberByDiscordUsername(
        discordUsername,
      );

      res.status(200).send(member);
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

      if (await MembersModel.getMemberByDiscordUsername(discordUsername)) {
        res
          .status(400)
          .send('Member with given discord username already exists!');
        return;
      }

      if (!discordUsername) {
        // should be put in a middleware function, not here
        res.status(400).send('Discord username not provided!');
        return;
      }

      await MembersModel.save(discordUsername);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public deleteMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await MembersModel.delete(id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public deleteMemberByDiscordUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { discordUsername } = req.body;

      await MembersModel.deleteByDiscordUsername(discordUsername);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
