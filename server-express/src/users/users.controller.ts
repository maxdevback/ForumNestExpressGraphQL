import { Request, Response } from "express";
import { UsersValidate } from "./users.validators";
import "./users.service";
import { UsersService } from "./users.service";
import { Validate } from "../shared/validate";

class UsersControllerClass {
  async login(req: Request, res: Response) {
    try {
      const info = await UsersService.login(
        req.body.username,
        req.body.password,
        req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
      );
      console.log(info);
      req.session.user = info;
      res.send(info);
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async register(req: Request, res: Response) {
    try {
      const info = await UsersService.register({
        ...req.body,
        v: req.baseUrl.split("/")[2] as "v1.1" | "v1.2",
      });
      console.log(info);
      req.session.user = info;
      res.send(info);
    } catch (err: any) {
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
  async deleteAccount(req: Request, res: Response) {
    try {
      const id = req.session.user!._id;
      req.session.user = null;
      res.send(
        await UsersService.deleteAccount(
          id,
          req.baseUrl.split("/")[2] as "v1.1" | "v1.2"
        )
      );
    } catch (err: any) {
      req.session.user = null;
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
}

export const UsersController = new UsersControllerClass();
