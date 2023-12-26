import { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { sendErrorOrExceptionToClient } from "./shared/shared.error-or-exeception-to-client";
import { secretsConfig } from "./config/config.sectrets";
import { appInfoConfig } from "./config/config.app.info";

class GlobalMiddlewaresClass {
  cors = cors({
    origin: appInfoConfig.clientUrl,
    credentials: true,
  });
  cookieSession = cookieSession({
    name: "session",
    keys: [secretsConfig.cookieSessionSecret],
  });
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    sendErrorOrExceptionToClient(res, err);
  }
}

export const GlobalMiddlewares = new GlobalMiddlewaresClass();
