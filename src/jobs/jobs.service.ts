import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class JobsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(dto: CreateJobDto) {
    const {
      title,
      description,
      location,
      required_skills,
      salary_min,
      salary_max,
      employer_id,
    } = dto;

      const cleanTitle = sanitizeHtml(title);
      const cleanDescription = sanitizeHtml(description);
      const cleanLocation = sanitizeHtml(location);
      const cleanSkills = sanitizeHtml(required_skills);

    const sql = `
    INSERT INTO jobs (title, description, location, required_skills, salary_min, salary_max, employer_id, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    RETURNING *;
  `;
    const result = await this.dataSource.query(sql, [
      cleanTitle,
      cleanDescription,
      cleanLocation,
      cleanSkills,
      salary_min,
      salary_max,
      employer_id,
    ]);
    return result[0];
  }

  async findAll(keyword?: string, location?: string) { //It will avoid SQL injection
    let sql = `SELECT * FROM jobs WHERE archived = false`;
    const params = [];
    if (keyword) {
      sql += ` AND (title ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1} OR required_skills ILIKE $${params.length + 1})`;
      params.push(`%${keyword}%`);
    }
    if (location) {
      sql += ` AND location ILIKE $${params.length + 1}`;
      params.push(`%${location}%`);
    }
    sql += ` ORDER BY created_at DESC`;
    return await this.dataSource.query(sql, params);
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

    const cleanTitle = sanitizeHtml(updated.title);
    const cleanDescription = sanitizeHtml(updated.description);
    const cleanLocation = sanitizeHtml(updated.location);
    const cleanSkills = sanitizeHtml(updated.required_skills);

    const sql = `
    UPDATE jobs
    SET title = $1,
        description = $2,
        location = $3,
        required_skills = $4,
        salary_min = $5,
        salary_max = $6
    WHERE job_id = $7
    RETURNING *;
  `;
    const result = await this.dataSource.query(sql, [
      cleanTitle,
      cleanDescription,
      cleanLocation,
      cleanSkills,
      updated.salary_min,
      updated.salary_max,
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