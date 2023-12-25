import { Response } from "express";

export const sendErrorOrExceptionToClient = (res: Response, err: any) => {
  if (!err.httpCode || err.httpCode === 500)
    return res.status(500).json("Internal server error");
  return res.status(err.httpCode).json(err.message);
};
