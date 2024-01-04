import { prisma } from "../yoga.server";
import { AuthHelpers } from "./auth.helpers";
import { ICreateUser } from "./auth.interfaces";
import { Request, Response } from "express";

//TODO: Errors
class AuthServiceClass {
  async create(data: ICreateUser) {
    console.log(data);
    const hashedPassword = await AuthHelpers.hashPassword(data.password);
    console.log(hashedPassword);
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
    if (!user) throw "";
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
