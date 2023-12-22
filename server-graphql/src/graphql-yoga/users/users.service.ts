import { prisma } from "./users.controller";

class UsersServiceClass {
  take = 25;
  async findUsersByPage(page: number, context: any) {
    //TODO:Header for auth
    //console.log(context.res.setHeader("Auth", "111"));
    const skip = (page - 1) * 25;
    return await prisma.user.findMany({ skip, take: this.take });
  }
  async findUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }
}

export const UsersService = new UsersServiceClass();
