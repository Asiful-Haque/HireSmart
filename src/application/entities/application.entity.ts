import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  application_id!: number;

  @Column()
  job_id!: number;

  @Column()
  candidate_user_id!: number;

  @Column('text')
  cover_letter_text!: string;

  @Column()
  location!: string;

  @Column()
  application_status!: string;

  @CreateDateColumn()
  applied_at!: Date;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id', referencedColumnName: 'job_id' })
  job!: Job;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'candidate_user_id', referencedColumnName: 'user_id' })
  candidate!: User;
}
