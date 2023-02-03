import { IsEmail, IsString } from 'class-validator';

export class ContactMailDto {
  @IsEmail({
    message: 'Invalid email address.',
  })
  public email: string;

  @IsString()
  public fullName: string;

  @IsString()
  public subject: string;

  @IsString()
  public messageContent: string;
}
