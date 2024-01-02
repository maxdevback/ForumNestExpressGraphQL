import { Request, Response, NextFunction } from "express";
import { AuthHelpers } from "./auth.helpers";

class AuthMiddlewaresClass {
  async checkJwt(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenA = req.headers?.authorization;
      const tokenR = req.cookies?.Authorization;
      if (tokenA && tokenR) {
        const check = AuthHelpers.validate(tokenA.substring(7), tokenR);
        if (check.status === "normal" && check.data) {
          const { id, username } = check.data;
          req.user = { id, username };
        } else if (check.status === "expired" && check.data) {
          const { id, username } = check.data;
          //TODO: Token will be from db
          // const token = await "FROMDB";
          // if (token !== check.tokenR || token === null) throw {};
          const newTokens = AuthHelpers.createJWT({ id, username });
          // await "SET NEW TOKEN TO DB";
          AuthHelpers.set(res, newTokens.tokenA, newTokens.tokenR);
          req.user = { id, username };
        } else {
          throw "";
        }
      }
    } catch (err) {
      AuthHelpers.clear(res);
    } finally {
      next();
    }
  }
}

export const AuthMiddlewares = new AuthMiddlewaresClass();
