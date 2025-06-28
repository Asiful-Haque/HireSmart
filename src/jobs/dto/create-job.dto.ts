import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  required_skills!: string;

  @IsNumber()
  @IsNotEmpty()
  salary_min!: number;

  @IsNumber()
  @IsNotEmpty()
  salary_max!: number;

  @IsNumber()
  @IsNotEmpty()
  employer_id!: number;
}
