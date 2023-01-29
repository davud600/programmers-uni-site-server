import { IsEmail, IsString, Matches } from 'class-validator';

export class MemberDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9\ ._-]+#[0-9]{4,}$/, {
    message:
      'Invalid Discord username format, Please make sure the username you provided is correct.',
  })
  public discordUsername: string;

  @IsEmail({
    message: 'Invalid email address.',
  })
  public email: string;
}
