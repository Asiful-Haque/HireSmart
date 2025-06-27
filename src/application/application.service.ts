import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly dataSource: DataSource) {}

  async apply(dto: CreateApplicationDto) {
    const {
      job_id,
      candidate_user_id,
      cover_letter_text,
      application_status,
      location,
    } = dto;
    const sql = `
      INSERT INTO applications 
        (job_id, candidate_user_id, cover_letter_text, application_status, location, applied_at)
      VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *;
    `;
    const result = await this.dataSource.query(sql, [
      job_id,
      candidate_user_id,
      cover_letter_text,
      application_status,
      location,
    ]);
    return result[0];
  }

  async getPerJobApplies(job_id: number) {
    const sql = `SELECT * FROM applications WHERE job_id = $1 ORDER BY applied_at DESC;`;
    return await this.dataSource.query(sql, [job_id]);
  }

  async getOwnApplies(candidate_user_id: number) {
    const sql = `SELECT * FROM applications WHERE candidate_user_id = $1 ORDER BY applied_at DESC;`;
    return await this.dataSource.query(sql, [candidate_user_id]);
  }
}
