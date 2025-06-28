import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JobsService } from 'src/jobs/jobs.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    private readonly jobsService: JobsService,
    private readonly usersService: UsersService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async archiveOldJobs() {
    this.logger.log('Archive job operation running...');
    await this.jobsService.archiveOldJobs();
  }
  @Cron(CronExpression.EVERY_WEEK)
  async removeUnverifiedUsers() {
    this.logger.log('Running weekly cleanup of unverified users...');
    await this.usersService.removeUnverifiedUsers();
  }
}
