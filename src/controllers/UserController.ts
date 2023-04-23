import { z } from "zod"
import { prisma } from "../database"

export async function createUser(request, response) {
  const user = z.object({
    name: z.string(),
    email: z.string().email(),
    birth_date: z.coerce.date(),
  })

  const { name, email, birth_date } = user.parse(request.body)

  const userEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (email === userEmail?.email) {
    return response.status(400).send({
      message: "User already exists",
    })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      birth_date,
    },
  })

  return response.status(200).send({
    message: "User created successfully",
  })
}

export async function getUsers(request, response) {
  const users = await prisma.user.findMany()

  return response.status(200).send(users)
}
