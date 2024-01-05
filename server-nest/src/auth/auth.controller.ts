import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('/auth/v1.1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() data: RegisterUserDto, @Session() session) {
    const registerData = await this.authService.registerOld(data);
    session.user = registerData;
    return registerData;
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto, @Session() session) {
    const loginData = await this.authService.loginOld(data);
    session.user = loginData;
    return loginData;
  }
  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Session() session) {
    return session.user;
  }

  @UseGuards(AuthGuard)
  @Delete('/logout')
  logout(@Session() session) {
    return (session.user = null);
  }
}
