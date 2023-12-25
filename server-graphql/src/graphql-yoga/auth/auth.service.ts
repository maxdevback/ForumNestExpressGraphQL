import { prisma } from "../users/users.controller";
import { AuthHelpers } from "./auth.helpers";
import { ICreateUser } from "./auth.interfaces";
import { Request, Response } from "express";

//TODO: Errors
class AuthServiceClass {
  async create(data: ICreateUser) {
    const hashedPassword = await AuthHelpers.hashPassword(data.password);
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
    return newUser.id;
  }
  async login(
    data: { username: string; password: string },
    context: { req: Request; res: Response }
  ) {
    const user = await prisma.user.findUnique({
      where: { username: data.username },
    });
    const isPasswordEqual = await AuthHelpers.comparePassword(
      data.password,
      user.password
    );
    if (!isPasswordEqual) throw new Error();
    const tokens = AuthHelpers.createJWT({
      username: user.username,
      id: user.id,
    });
    AuthHelpers.set(context.res, tokens.tokenA, tokens.tokenR);
    return user.id;
  }
}

export const AuthService = new AuthServiceClass();
