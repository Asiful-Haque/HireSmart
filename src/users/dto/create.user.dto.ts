import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export enum UserRole {
  Admin = 'admin',
  Employer = 'employer',
  Candidate = 'candidate',
}

export class CreateUserDto {
  @IsString()
  full_name!: string;

  @IsEmail()
  email_address!: string;

  @MinLength(6)
  password_hash!: string;

  @IsEnum(UserRole)
  user_role!: UserRole;
}
