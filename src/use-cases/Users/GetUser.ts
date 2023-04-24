import { prisma } from "../../database"

export async function GetUser(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}
