import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { JobsModule } from 'src/jobs/jobs.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JobsModule, UsersModule],
  providers: [CronService],
})
export class CronModule {}
