import { NextFunction, Request, Response } from 'express';
import MemberService from '@/services/members.service';

export default class MembersController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const members = await MemberService.findAll();

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

      const member = await MemberService.getMemberById(id);

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

      const member = await MemberService.getMemberByDiscordUsername(
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

      if (await MemberService.getMemberByDiscordUsername(discordUsername)) {
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

      await MemberService.save(discordUsername);

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

      await MemberService.delete(id);

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

      await MemberService.deleteByDiscordUsername(discordUsername);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
