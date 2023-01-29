import { NextFunction, Request, Response } from 'express';
import MemberService from '@/services/members.service';
import { MemberDto } from '@/dtos/member.dto';

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
      const { discordUsername, email }: MemberDto = req.body;

      if (await MemberService.getMemberByDiscordUsername(discordUsername)) {
        res
          .status(400)
          .send('Member with given discord username already exists!');
        return;
      }

      await MemberService.save(discordUsername, email);

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

  public warnMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await MemberService.warnMember(id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public removeMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await MemberService.removeMember(id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public getMembersToWarn = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const membersToWarm = await MemberService.getMembersToWarn();

      res.status(200).send(membersToWarm);
    } catch (error) {
      next(error);
    }
  };

  public getMembersToRemove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const membersToRemove = await MemberService.getMembersToRemove();

      res.status(200).send(membersToRemove);
    } catch (error) {
      next(error);
    }
  };

  public getMembersToUpgrade = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const membersToUpgrade = await MemberService.getMembersToUpgrade();

      res.status(200).send(membersToUpgrade);
    } catch (error) {
      next(error);
    }
  };
}
