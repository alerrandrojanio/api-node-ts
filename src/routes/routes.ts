import { FastifyInstance } from "fastify"

import { createUser, getUsers } from "../controllers/UserController"
import { createPost, getPosts } from "../controllers/PostController"

export async function appRoutes(app: FastifyInstance) {
  app.post("/user", createUser)
  app.get("/user", getUsers)

  app.post("/post", createPost)
  app.get("/post", getPosts)
}
