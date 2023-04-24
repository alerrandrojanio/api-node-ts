import { prisma } from "../../database"

export async function CreateUser(name, email, birth_date) {
  return await prisma.user.create({
    data: {
      name,
      email,
      birth_date,
    },
  })
}
