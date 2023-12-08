import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Session,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('/posts/v1.1')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Session() session) {
    return this.postsService.create(createPostDto, session.user.id);
  }

  @Get('/id/:postId')
  getByPostId(@Param('postId') postId) {
    return this.postsService.getByPostId(postId);
  }
  @UseGuards(AuthGuard)
  @Get('/my/:page')
  getMyByPage(@Param('page') page, @Session() session) {
    return this.postsService.getMyByPage(page, session.user.id);
  }
  @Get('/author/:postId')
  getAuthorByPostId(@Param('postId') postId: number) {
    return this.postsService.getAuthorByPostId(postId);
  }
  @Get('/:authorId/:page')
  getPostsByAuthorAndPage(
    @Param('authorId') id: number,
    @Param('page') page: number,
  ) {
    return this.postsService.getMyByPage(page, id);
  }
  @Get('/:page')
  getByPage(@Param('page') page) {
    return this.postsService.getByPage(page);
  }
  @UseGuards(AuthGuard)
  @Patch('/:postId')
  update(
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
    @Session() session,
  ) {
    return this.postsService.update(postId, updatePostDto, session.user.id);
  }
}
