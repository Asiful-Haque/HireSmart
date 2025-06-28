import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);

  constructor(private dataSource: DataSource) {}

  async handleMatchCandidatesToJobs() {
    this.logger.log('Running job candidate matching process...');

    const jobs = await this.dataSource.query(`
      SELECT job_id, title, required_skills, location, salary_min, salary_max FROM jobs
    `);

    const candidates = await this.dataSource.query(`
      SELECT user_id, skills, location, expected_salary FROM users WHERE role = 'candidate'
    `);

    const matchedResults = [];

    for (const job of jobs) {
      const requiredSkills = job.required_skills
        .split(',')
        .map((s: string) => s.trim().toLowerCase());
      const jobLocation = job.location.toLowerCase();

      for (const user of candidates) {
        const userSkills = user.skills
          .split(',')
          .map((s: string) => s.trim().toLowerCase());
        const locationMatch = user.location.toLowerCase() === jobLocation;
        const salaryMatch =
          user.expected_salary >= job.salary_min &&
          user.expected_salary <= job.salary_max;
        const skillMatch = requiredSkills.every((skill: string) =>
          userSkills.includes(skill),
        );

        if (locationMatch && salaryMatch && skillMatch) {
          matchedResults.push({
            job_id: job.job_id,
            user_id: user.user_id,
          });

          this.logger.log(
            `✅ Match: User ${user.user_id} matches Job ${job.job_id}`,
          );
        }
      }
    }

    this.logger.log(
      `Finished matching. Total matches: ${matchedResults.length}`,
    );
    return { matches: matchedResults };
  }
}
