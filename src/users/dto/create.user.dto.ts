import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @IsString()
  @IsNotEmpty()
  email_address!: string;

  @IsString()
  @IsNotEmpty()
  password_hash!: string;

  @IsString()
  @IsNotEmpty()
  user_role!: 'admin' | 'employer' | 'candidate';

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  expected_salary?: number;
}
