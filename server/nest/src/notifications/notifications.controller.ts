import { Controller, Get, Param, Session, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from 'src/shared/guards/user.auth.guard';

@Controller('notifications/v1.2')
export class NotificationsControllerV1_2 {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard)
  @Get('/:page')
  getMyByPage(@Param('page') page: number, @Session() session) {
    return this.notificationsService.getMyPage(page, session.user.id);
  }
}
