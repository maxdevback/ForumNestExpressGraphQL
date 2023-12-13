import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  body: string;

  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: true })
  commentParentId: Post | null;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @Column({ default: 0 })
  roughNumberOfLikes: number;

  @Column({ default: false })
  hasReplays: boolean;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
