import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('/auth/v1.2')
export class AuthControllerV_1_2 {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() data: RegisterUserDto, @Session() session) {
    const registerData = await this.authService.register(data);
    session.user = registerData;
    return registerData;
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto, @Session() session) {
    const loginData = await this.authService.login(data);
    session.user = loginData;
    return loginData;
  }

  @Get('/me')
  async me(@Session() session) {
    return session.user;
  }
}
