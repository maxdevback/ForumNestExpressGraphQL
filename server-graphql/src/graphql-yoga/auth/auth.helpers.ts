import { hash, compare } from "bcrypt";
import { Request, Response } from "express";
import { ITokensStatus, authData, jwtAuthPayload } from "./auth.interfaces";
import JWT from "jsonwebtoken";

class AuthHelpersClass {
  salt = 15;
  jwtSecretA = process.env.AUTH_TOKEN_A!;
  jwtSecretR = process.env.AUTH_TOKEN_R!;
  async hashPassword(password: string) {
    return await hash(password, this.salt);
  }
  async comparePassword(purePassword: string, hashedPassword: string) {
    return await compare(purePassword, hashedPassword);
  }
  createJWT(data: authData) {
    return {
      tokenA: JWT.sign(data, this.jwtSecretA, {
        expiresIn: "5m",
      }),
      tokenR: JWT.sign(data, this.jwtSecretR, {
        expiresIn: "30 days",
      }),
    };
  }
  _isEqual(tokenAPayload: jwtAuthPayload, tokenRPayload: jwtAuthPayload) {
    try {
      if (
        tokenAPayload.name === tokenRPayload.name &&
        tokenAPayload.id === tokenRPayload.id &&
        tokenAPayload.role === tokenRPayload.role
      ) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  validate(tokenA: string, tokenR: string) {
    try {
      const tokensStatus: ITokensStatus = {
        status: "normal",
        tokenA,
        tokenR,
        data: null,
      };
      const tokenAData = JWT.verify(
        tokenA,
        process.env.AUTH_TOKEN_A!
      ) as unknown as jwtAuthPayload;
      const tokenRData = JWT.verify(
        tokenR,
        process.env.AUTH_TOKEN_R!
      ) as unknown as jwtAuthPayload;
      if (!this._isEqual(tokenAData, tokenRData)) {
        tokensStatus.status = "invalid";
      } else {
        tokensStatus.data = tokenAData;
      }
      return tokensStatus;
    } catch (err) {
      const tokensStatus: ITokensStatus = {
        status: "expired",
        tokenA,
        tokenR,
        data: null,
      };
      let tokenRData: jwtAuthPayload;
      try {
        tokenRData = JWT.verify(tokenR, this.jwtSecretR) as jwtAuthPayload;
      } catch (err) {
        tokensStatus.status = "fullExpiresOrMissing";
        return tokensStatus;
      }
      const tokenAData = JWT.decode(tokenA) as jwtAuthPayload | null;
      if (!tokenAData || !this._isEqual(tokenAData, tokenRData))
        tokensStatus.status = "invalid";
      else if (tokenAData) tokensStatus.data = tokenAData;
      return tokensStatus;
    }
  }
  set(res: Response, tokenA: string, tokenR: string) {
    res.cookie("Authorization", tokenR, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.header("Authorization", "Bearer " + tokenA);
  }
  clear(res: Response) {
    res.clearCookie("Authorization");
  }
}

export const AuthHelpers = new AuthHelpersClass();
