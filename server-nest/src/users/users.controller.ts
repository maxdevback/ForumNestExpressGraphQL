import { Controller, Delete, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('users/v1.1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Delete('/delete')
  async delete(@Session() session) {
    const user = await this.usersService.delete(session.user.id);
    session.user = null;
    return user;
  }
}
