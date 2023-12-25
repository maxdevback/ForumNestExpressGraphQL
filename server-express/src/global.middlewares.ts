import { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { sendErrorOrExceptionToClient } from "./shared/shared.error-or-exeception-to-client";

class GlobalMiddlewaresClass {
  cors = cors({
    origin: "http://localhost:3000",
    credentials: true,
  });
  cookieSession = cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET!],
  });
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    //TODO:
    sendErrorOrExceptionToClient(res, err);
  }
}

export const GlobalMiddlewares = new GlobalMiddlewaresClass();
