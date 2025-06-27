import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  salary!: number;

  @IsNumber()
  @IsNotEmpty()
  employer_id!: number;
}
