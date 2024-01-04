import { Request, Response } from 'express';
import { UsersService } from './users.service';

class UsersControllerClass {
  async deleteAccount(req: Request, res: Response) {
    const id = req.session.user!._id;
    const result = await UsersService.deleteAccount(id, req.session);
    res.send(result);
  }
}

export const UsersController = new UsersControllerClass();
