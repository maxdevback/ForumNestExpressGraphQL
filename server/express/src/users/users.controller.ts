import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import "./users.service";
import { UsersService } from "./users.service";

class UsersControllerClass {
  validateRegisterBody(req: Request, res: Response, next: NextFunction) {
    try {
      const validateRes = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
      }).validate(req.body);
      if (validateRes.error) throw validateRes.error.details[0].message;
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  }
  validateLoginBody(req: Request, res: Response, next: NextFunction) {
    try {
      const validateRes = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(6).required(),
      }).validate(req.body);
      if (validateRes.error) throw validateRes.error.details[0].message;
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async login(req: Request, res: Response) {
    try {
      const info = await UsersService.login(
        req.body.username,
        req.body.password
      );
      req.session.user = info;
      res.send(info);
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async register(req: Request, res: Response) {
    try {
      const info = await UsersService.register(
        req.body.username,
        req.body.email,
        req.body.password
      );
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
    res.send("susses");
  }
}

export const UsersController = new UsersControllerClass();
