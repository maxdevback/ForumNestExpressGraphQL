import { AuthService } from "./auth.service";
import { ICreateUser } from "./auth.interfaces";
import { Request, Response } from "express";

export const authResolver = {
  Query: {
    myAuth: async (_: undefined, __: undefined, context: { req: Request }) => {
      return context.req.user;
    },
  },
  Mutation: {
    register: async (_: undefined, data: { data: ICreateUser }) => {
      return await AuthService.create(data.data);
    },
    login: async (
      _: undefined,
      data: { data: { username: string; password: string } },
      context: { req: Request; res: Response }
    ) => {
      return await AuthService.login(data.data, context);
    },
  },
};
