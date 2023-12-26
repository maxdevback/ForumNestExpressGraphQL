import { NextFunction, Request, Response } from "express";
import "./users.service";
import { UsersService } from "./users.service";

class UsersControllerOldClass {
  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.session.user!._id;
      req.session.user = null;
      res.send(await UsersService.deleteAccount(id));
    } catch (err: any) {
      req.session.user = null;
      next(err);
    }
  }
}

export const UsersControllerOld = new UsersControllerOldClass();
