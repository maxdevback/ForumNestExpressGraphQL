import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('users/v1.1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() body: RegisterUserDto, @Session() session) {
    const userData = await this.usersService.register(body);
    session.user = userData;
    return userData;
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto, @Session() session) {
    const userData = await this.usersService.login(body);
    session.user = userData;
    return userData;
  }
  @Get('/my')
  getMyData(@Session() session) {
    return session.user;
  }
  @Delete('/logout')
  logout(@Session() session) {
    return (session.user = null);
  }
  @UseGuards(AuthGuard)
  @Delete('/delete')
  async delete(@Session() session) {
    const user = await this.usersService.delete(session.user.id);
    session.user = null;
    return user;
  }
}
