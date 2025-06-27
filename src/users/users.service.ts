import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async createUser(user: {
    full_name: string;
    email_address: string;
    password_hash: string;
    user_role: string;
  }) {
    const sql = `
      INSERT INTO users (full_name, email_address, password_hash, user_role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      user.full_name,
      user.email_address,
      user.password_hash,
      user.user_role,
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
}
