import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  full_name!: string;

  @IsEmail()
  email_address!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(['admin', 'employer', 'candidate'])
  user_role!: 'admin' | 'employer' | 'candidate';
}
