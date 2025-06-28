import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(dto: CreateJobDto) {
    const { title, description, location, salary, employer_id } = dto;
    const sql = `
      INSERT INTO jobs (title, description, location, salary, employer_id, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *;
    `;
    const result = await this.dataSource.query(sql, [
      title,
      description,
      location,
      salary,
      employer_id,
    ]);
    return result[0];
  }

  async findAll() {
    const sql = 'SELECT * FROM jobs ORDER BY created_at DESC';
    return await this.dataSource.query(sql);
  }

  async findByEmployer(employer_id: string) {
    const sql =
      'SELECT * FROM jobs WHERE employer_id = $1 ORDER BY created_at DESC';
    return await this.dataSource.query(sql, [employer_id]);
  }

  async findOne(id: string) {
    const sql = 'SELECT * FROM jobs WHERE job_id = $1';
    const result = await this.dataSource.query(sql, [id]);
    return result[0] || null;
  }

  async update(id: string, dto: UpdateJobDto) {
    const existing = await this.findOne(id);
    if (!existing) return null;

    const updated = { ...existing, ...dto };

    const sql = `
      UPDATE jobs
      SET title = $1,
          description = $2,
          location = $3,
          salary = $4
      WHERE job_id = $5
      RETURNING *;
    `;
    const result = await this.dataSource.query(sql, [
      updated.title,
      updated.description,
      updated.location,
      updated.salary,
      id,
    ]);
    return result[0];
  }

  async remove(id: string) {
    const sql = 'DELETE FROM jobs WHERE job_id = $1 RETURNING *';
    const result = await this.dataSource.query(sql, [id]);
    return result[0];
  }

  async archiveOldJobs() {
    const sql = `
      UPDATE jobs
      SET archived = true
      WHERE created_at < NOW() - INTERVAL '30 days' AND archived = false;
    `;
    await this.dataSource.query(sql);
  }
}