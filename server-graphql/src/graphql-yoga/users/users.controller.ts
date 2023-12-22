import { PrismaClient } from "@prisma/client";

const prisma: { user: any } = new PrismaClient();

export { prisma };
