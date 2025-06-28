import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async createUser(user: {
    full_name: string;
    email_address: string;
    password_hash: string;
    user_role: string;
    skills?: string | null;
    location?: string | null;
    expected_salary?: number | null;
  }) {
    const sql = `
    INSERT INTO users (full_name, email_address, password_hash, user_role, skills, location, expected_salary)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

    const values = [
      sanitizeHtml(user.full_name),
      user.email_address,
      user.password_hash,
      user.user_role,
      user.skills ? sanitizeHtml(user.skills) : null,
      user.location ? sanitizeHtml(user.location) : null,
      user.expected_salary ?? null,
    ];

    console.log(values);
    const result = await this.dataSource.query(sql, values);
    return result[0];
  }

  async findByEmail(email: string) {
    const sql = `SELECT * FROM users WHERE email_address = $1`;
    const result = await this.dataSource.query(sql, [email]);
    return result[0];
  }

  async removeUnverifiedUsers() {
    const sql = `
      DELETE FROM users
      WHERE is_verified = false AND created_at < NOW() - INTERVAL '7 days';
    `;
    await this.dataSource.query(sql);
  }
}
