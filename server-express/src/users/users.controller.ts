import { Request, Response } from "express";
import "./users.service";
import { UsersService } from "./users.service";

class UsersControllerClass {
  async deleteAccount(req: Request, res: Response) {
    try {
      const id = req.session.user!._id;
      req.session.user = null;
      res.send(await UsersService.deleteAccount(id));
    } catch (err: any) {
      req.session.user = null;
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const UsersController = new UsersControllerClass();
