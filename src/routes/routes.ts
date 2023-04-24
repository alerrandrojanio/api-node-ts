import { FastifyInstance } from "fastify"

import { createUser, getAllUsers, getUser } from "../controllers/UserController"
import { createPost, getPosts } from "../controllers/PostController"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", createUser)
  app.get("/users", getAllUsers)
  app.get("/users/:id", getUser)

  app.post("/posts", createPost)
  app.get("/posts", getPosts)
}
