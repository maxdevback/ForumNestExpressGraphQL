import { LoginUserDto } from './login-user.dto';
import { IsEmail } from 'class-validator';

export class RegisterUserDto extends LoginUserDto {
  @IsEmail()
  email: string;
}
