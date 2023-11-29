import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import "./users.service";
import passport from "passport";

class UsersControllerClassV1_1 {
  validateAuthBody(req: Request, res: Response, next: NextFunction) {
    try {
      const validateRes = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(6).required(),
      }).validate(req.body);
      if (validateRes.error) throw validateRes.error.details[0].message;
      console.log("before next");
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async login(req: Request, res: Response) {
    try {
      passport.authenticate("login", (err: any, user: any, info: any) => {
        console.log(info);
        if (err) {
          res.send(err);
        }
        if (!user) {
          return res
            .status(info.httpCode ?? 400)
            .json({ success: false, message: JSON.stringify(info.message) });
        }

        res.json({ success: true, user });
      })(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async signup(req: Request, res: Response) {
    try {
      passport.authenticate("signup", (err: any, user: any, info: any) => {
        if (err) {
          res.send(err);
        }
        if (!user) {
          return res
            .status(info.httpCode ?? 400)
            .json({ success: false, message: JSON.stringify(info.message) });
        }

        res.json({ success: true, user });
      })(req, res);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

class UsersControllerClassV1_2 {
  hello(req: Request, res: Response) {
    res.send(req.user);
  }
}

export const UsersControllerV1_1 = new UsersControllerClassV1_1();
export const UsersControllerV1_2 = new UsersControllerClassV1_2();
