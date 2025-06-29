import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { AdminModule } from './admin/admin.module';
import { CronModule } from './cronForTaskSchedule/cron.module';
import { MatchModule } from './job-engine/match.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, // use migrations in prod
    }),
    ThrottlerModule.forRoot({ //Its for rate limiting for user per minute
      throttlers: [
        {
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    UsersModule,
    AuthModule,
    JobsModule,
    AdminModule,
    CronModule,
    MatchModule,
  ],
})
export class AppModule {}
