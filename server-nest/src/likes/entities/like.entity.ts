import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'like' })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityType: 'post' | 'comment';

  @ManyToOne(() => Comment, (comment) => comment.id)
  comment: Comment;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
