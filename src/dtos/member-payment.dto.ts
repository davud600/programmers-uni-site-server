import { IsNumber, IsString, Matches } from 'class-validator';

export class MemberPaymentDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9\ ._-]+#[0-9]{4,}$/, {
    message: 'Invalid Discord username format',
  })
  public discordUsername: string;

  @IsNumber()
  public amount: number;
}
