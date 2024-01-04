import { Request, Response } from 'express';
import { AuthService } from './auth.service';

class AuthControllerOldClass {
  async login(req: Request, res: Response) {
    const user = await AuthService.loginOld(req.body);
    req.session.user = user;
    res.send(user);
  }
  async register(req: Request, res: Response) {
    const user = await AuthService.register(req.body);
    req.session.user = user;
    res.send(user);
  }
  async getMyInfo(req: Request, res: Response) {
    res.send(req.session.user);
  }
  async logout(req: Request, res: Response) {
    req.session.user = null;
    res.send({ message: 'success' });
  }
}

export const AuthControllerOld = new AuthControllerOldClass();
