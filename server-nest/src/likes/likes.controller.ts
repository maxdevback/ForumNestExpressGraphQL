import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Session,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('likes/v1.1')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post('/post/:postId')
  likePost(@Param('postId') postId: number, @Session() session) {
    return this.likesService.likePost(postId, session.user.id);
  }
  @UseGuards(AuthGuard)
  @Get('/isLiked/:type/:entityId')
  isLikedEntity(
    @Param('entityId') entityId: number,
    @Param('type') type: 'post' | 'comment',
    @Session() session,
  ) {
    return this.likesService.isLikedEntity(entityId, type, session.user.id);
  }
  @UseGuards(AuthGuard)
  @Post('/comment/:commentId')
  likeComment(@Param('commentId') commentId: number, @Session() session) {
    return this.likesService.likeComment(commentId, session.user.id);
  }
}
