import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', default: '' })
  title: string;

  @Column({ type: 'varchar', default: '' })
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
