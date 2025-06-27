import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Job } from './jobs/entities/job.entity';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  synchronize: false,
  entities: [User, Job],
  migrations: ['src/migrations/*.ts'],
});
