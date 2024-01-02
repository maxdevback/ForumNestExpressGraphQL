import { prisma } from "../yoga.server";

class UsersServiceClass {
  take = 25;
  async findUsersByPage(page: number, context: any) {
    const skip = (page - 1) * this.take;
    const res = await prisma.user.findMany({
      skip,
      take: this.take,
      include: { posts: true },
    });
    return res;
  }

  async findUserById(id: number) {
    const res = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    console.log(res);
    return res;
  }
}

export const UsersService = new UsersServiceClass();
