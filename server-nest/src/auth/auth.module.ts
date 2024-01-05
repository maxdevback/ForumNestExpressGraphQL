import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersRepositoryV1_2 } from '../users/users.repository.v1.2';
import { AuthController } from './auth.controller';
import { AuthControllerV_1_2 } from './auth.controller.v1.2';
import { AuthHelpers } from './auth.helpers';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController, AuthControllerV_1_2],
  providers: [
    UsersService,
    UsersRepository,
    UsersRepositoryV1_2,
    AuthHelpers,
    AuthService,
  ],
})
export class AuthModule {}
