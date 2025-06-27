import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Job } from './jobs/entities/job.entity';
import { Application } from './application/entities/application.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  synchronize: false,
  entities: [User, Job, Application],
  migrations: ['src/migrations/*.ts'],
});
