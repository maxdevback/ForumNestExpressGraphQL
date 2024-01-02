import { UsersService } from "./users.service";

export const usersResolver = {
  Query: {
    users: async (_: undefined, { page }: { page: string }, context: any) => {
      return await UsersService.findUsersByPage(+page, context);
    },
    user: async (_: undefined, { id }: { id: string }) => {
      return await UsersService.findUserById(+id);
    },
  },
};
