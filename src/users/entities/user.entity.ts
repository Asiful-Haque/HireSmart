import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id!: number;

  @Column()
  full_name!: string;

  @Column({ unique: true })
  email_address!: string;

  @Column()
  password_hash!: string;

  @Column({ default: 'candidate' })
  user_role!: 'admin' | 'employer' | 'candidate';

  @Column({ default: false })
  is_verified!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
