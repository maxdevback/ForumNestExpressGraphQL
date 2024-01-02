import { JwtPayload } from "jsonwebtoken";
export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

export interface authData {
  username: string;
  id: number;
}

export type jwtAuthPayload = JwtPayload & authData;

export interface ITokensStatus {
  status: string;
  tokenA: string;
  tokenR: string;
  data: null | jwtAuthPayload;
}

declare global {
  namespace Express {
    interface Request {
      user?: authData;
    }
  }
}
