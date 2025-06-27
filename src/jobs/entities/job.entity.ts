import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  job_id!: number; 

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  @Column()
  salary!: number;

  @Column()
  employer_id!: number; // Foreign key 

  @ManyToOne(() => User)
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'user_id' })
  owner! : User;

  @CreateDateColumn()
  created_at!: Date;
}
