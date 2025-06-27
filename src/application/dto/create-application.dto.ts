import { IsString, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  job_id!: number;

  @IsNotEmpty()
  candidate_user_id!: number;

  @IsString()
  cover_letter_text!: string;

  @IsString()
  application_status!: string;

  @IsString()
  location!: string;
}
