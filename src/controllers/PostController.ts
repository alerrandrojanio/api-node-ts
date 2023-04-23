import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../database"
import dayjs from "dayjs"

export async function PostRoutes(app: FastifyInstance) {
  app.post("/post", async (request, response) => {
    const post = z.object({
      title: z.string(),
      content: z.string(),
      user_id: z.string(),
    })

    const { title, content, user_id } = post.parse(request.body)

    const today = dayjs().startOf("day").toDate()

    const newPost = await prisma.post.create({
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
  })

  app.get("/post", async (request, response) => {
    const posts = await prisma.post.findMany()

    return response.status(200).send(posts)
  })
}
