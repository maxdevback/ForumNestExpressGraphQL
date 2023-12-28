import { Request, Response } from 'express';
import { AuthService } from './auth.service';

class AuthController_v1_2Class {
  async login(req: Request, res: Response) {
    const user = await AuthService.login(req.body);
    req.session.user = user;
    res.send(user);
  }
}

export const AuthController_v1_2 = new AuthController_v1_2Class();
