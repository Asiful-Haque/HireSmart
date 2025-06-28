import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(private dataSource: DataSource) {}
  async getMetrics() {
    const [users] = await this.dataSource.query('SELECT COUNT(*) FROM users');
    const [jobs] = await this.dataSource.query('SELECT COUNT(*) FROM jobs');
    const [applications] = await this.dataSource.query(
      'SELECT COUNT(*) FROM applications',
    );
    return {
      total_users: parseInt(users.count),
      total_jobs: parseInt(jobs.count),
      total_applications: parseInt(applications.count),
    };
  }
}
