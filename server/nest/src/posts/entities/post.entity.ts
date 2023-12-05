import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: false })
  hasComments: boolean;

  @Column({ default: 0 })
  roughNumberOfLikes: number;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
