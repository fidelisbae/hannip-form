import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Idea } from './idea.entity';
import { Script } from './script.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'int' })
  id: number;

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
