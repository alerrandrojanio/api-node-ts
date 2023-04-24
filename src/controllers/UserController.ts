import { z } from "zod"
import { prisma } from "../database"
import { CreateUser } from "../use-cases/Users/CreateUser"
import { GetAllUsers } from "../use-cases/Users/GetAllUsers"
import { GetUser } from "../use-cases/Users/GetUser"

export async function createUser(request, response) {
  const user = z.object({
    name: z.string(),
    email: z.string().email("Invalid email"),
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

  const sucess = await CreateUser(name, email, birth_date)

  if (!sucess)
    return response.status(500).send({
      message: "Error creating user",
    })

  return response.status(200).send({
    message: "User created successfully",
  })
}

export async function getAllUsers(request, response) {
  const users = await GetAllUsers()

  return response.status(200).send(users)
}

export async function getUser(request, response) {
  const user = await GetUser(request.params.id)

  if (!user)
    return response.status(404).send({
      message: "User not found",
    })

  return response.status(200).send(user)
}
