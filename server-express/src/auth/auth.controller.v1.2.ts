import { Request, Response } from "express";
import { AuthService } from "./auth.service";

class AuthController_v1_2Class {
  async login(req: Request, res: Response) {
    try {
      await AuthService.login(req.body);
    } catch (err: any) {
      req.session.user = null;
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const AuthController_v1_2 = new AuthController_v1_2Class();
