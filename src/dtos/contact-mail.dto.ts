import { IsEmail, IsString } from 'class-validator';

export class ContactMailDto {
  @IsString()
  public fullName: string;

  @IsEmail({
    message: 'Invalid email address.',
  })
  public email: string;

  @IsString()
  public messageContent: string;
}
