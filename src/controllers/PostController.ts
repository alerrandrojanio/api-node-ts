import { z } from "zod"
import { prisma } from "../database"
import dayjs from "dayjs"

export async function createPost(request, response) {
  const post = z.object({
    title: z.string(),
    content: z.string(),
    user_id: z.string(),
  })

  const { title, content, user_id } = post.parse(request.body)

  const today = dayjs().startOf("day").toDate()

  await prisma.post.create({
    data: {
      title,
      content,
      user_id,
      created_at: today,
    },
  })

  return response.status(200).send({
    message: "Post created successfully",
  })
}

export async function getAllPosts(request, response) {
  const posts = await prisma.post.findMany()

  return response.status(200).send(posts)
}
