import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email_address!: string;

  @IsString()
  password!: string;
}
