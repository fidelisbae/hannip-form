import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Script {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => User, (user) => user.scripts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar' })
  user_id: string;
}
