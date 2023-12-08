import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersControllerV1_2 } from './users.controller.v1.2';
import { UsersRepository } from './users.repository';
import { UsersRepositoryV1_2 } from './users.repository.v1.2';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, UsersControllerV1_2],
  providers: [UsersService, UsersRepository, UsersRepositoryV1_2],
})
export class UsersModule {}
