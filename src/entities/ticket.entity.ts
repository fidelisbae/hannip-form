import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', default: '' })
  question: string;

  @Column({ type: 'varchar', default: '' })
  answer: string;

  @Column({ type: 'boolean', default: false })
  is_answer: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', default: '' })
  user_id: string;
}
