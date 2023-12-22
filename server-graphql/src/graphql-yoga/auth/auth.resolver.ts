import { AuthService } from "./auth.service";
import { ICreateUser } from "./auth.interfaces";

export const authResolver = {
  Mutation: {
    register: async (_: undefined, data: { data: ICreateUser }) => {
      return await AuthService.create(data.data);
    },
    login: async (
      _: undefined,
      data: { data: { username: string; password: string } }
    ) => {
      return await AuthService.login(data.data);
    },
  },
};
