import { Request, Response } from "express";
import { AuthService } from "./auth.service";

class AuthControllerOldClass {
  async login(req: Request, res: Response) {
    try {
      const user = await AuthService.loginOld(req.body);
      req.session.user = user;
      res.send(user);
    } catch (err: any) {
      req.session.user = null;
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async register(req: Request, res: Response) {
    try {
      const user = await AuthService.registerOld(req.body);
      req.session.user;
      res.send(user);
    } catch (err: any) {
      req.session.user = null;
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getMyInfo(req: Request, res: Response) {
    res.send(req.session.user);
  }
  async logout(req: Request, res: Response) {
    req.session.user = null;
    res.send("success");
  }
}

export const AuthControllerOld = new AuthControllerOldClass();
