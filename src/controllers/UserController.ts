import { z } from "zod"
import { prisma } from "../database"

export async function createUser(request, response) {
  const user = z.object({
    name: z.string(),
    email: z.string().email("Invalid email"),
    birth_date: z.coerce.date(),
  })

  const { name, email, birth_date } = user.parse(request.body)

  if (await emailAlredyExists(email))
    return response.status(400).send({
      message: "User already exists",
    })

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

export async function getAllUsers(request, response) {
  const users = await prisma.user.findMany()

  return response.status(200).send(users)
}

export async function getUser(request, response) {
  const { id } = request.params

  const user = await userAlredyExists(id)

  if (!user)
    return response.status(404).send({
      message: "User not found",
    })

  return response.status(200).send(user)
}

export async function updateUser(request, response) {
  const { id } = request.params

  const user = await userAlredyExists(id)

  if (!user)
    return response.status(404).send({
      message: "User not found",
    })

  await prisma.user.update({
    data: {
      ...request.body,
    },
    where: {
      id,
    },
  })

  return response.status(200).send({
    message: "User updated successfully",
  })
}

export async function deleteUser(request, response) {
  const { id } = request.params

  const user = await userAlredyExists(id)

  if (!user)
    return response.status(404).send({
      message: "User not found",
    })

  await prisma.user.delete({
    where: {
      id,
    },
  })

  return response.status(200).send({
    message: "User deleted successfully",
  })
}

async function emailAlredyExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

async function userAlredyExists(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return user
}
