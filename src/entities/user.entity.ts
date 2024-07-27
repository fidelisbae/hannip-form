import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Idea } from './idea.entity';
import { Script } from './script.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', default: '회원님' })
  nickname: string;

  @Column({
    type: 'varchar',
    default: 'https://avatars.githubusercontent.com/u/70188733?v=4',
  })
  profile_image_url: string;

  @OneToMany(() => Idea, (idea) => idea.user)
  ideas: Idea[];

  @OneToMany(() => Script, (script) => script.user)
  scripts: Script[];
}
