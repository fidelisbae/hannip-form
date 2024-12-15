import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Idea } from './idea.entity';
import { Script } from './script.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', default: '회원님' })
  nickname: string;

  @Column({
    type: 'varchar',
    default: 'https://avatars.githubusercontent.com/u/70188733?v=4',
  })
  profile_image_url: string;

  @Column({ type: 'varchar', default: '' })
  channel_description: string;

  @Column({ type: 'varchar', default: '' })
  category: string;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @OneToMany(() => Idea, (idea) => idea.user)
  ideas: Idea[];

  @OneToMany(() => Script, (script) => script.user)
  scripts: Script[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
