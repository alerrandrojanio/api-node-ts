import { prisma } from "../../database"

export async function GetAllUsers() {
  return await prisma.user.findMany()
}
