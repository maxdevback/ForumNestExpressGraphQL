/* eslint-disable prettier/prettier */
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

@Controller('likes/v1.2')
export class LikesControllerV1_2 {
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
  ) {
    return this.likesService.isLikedEntity(entityId, type);
  }

  @UseGuards(AuthGuard)
  @Post('/comment/:commentId')
  likeComment(@Param('commentId') commentId: number, @Session() session) {
    return this.likesService.likeComment(commentId, session.user.id);
  }
}
