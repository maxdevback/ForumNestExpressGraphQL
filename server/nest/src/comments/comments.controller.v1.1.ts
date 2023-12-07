/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('/comments/v1.2')
export class CommentsControllerV1_2 {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post('/:postId')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: number,
    @Session() session,
  ) {
    return this.commentsService.create(
      createCommentDto,
      postId,
      session.user.id,
    );
  }

  @Get('/:postId/:page')
  getByPostIdAndPage(
    @Param('postId') postId: number,
    @Param('page') page: number,
  ) {
    return this.commentsService.getByPostIdAndPage(postId, page);
  }

  @Get('/:postId/:commentId/:page')
  getReplaysByPostIdAndCommentIdAndPage(
    @Param('postId') postId: number,
    @Param('commentId') commentId: number,
    @Param('page') page: number,
  ) {
    return this.commentsService.getReplaysByPostIdAndCommentIdAndPage(
      postId,
      commentId,
      page,
    );
  }
}
