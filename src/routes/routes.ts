import { FastifyInstance } from "fastify"

import {
  deleteUser,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/UserController"
import { createPost, getAllPosts } from "../controllers/PostController"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", createUser)
  app.get("/users", getAllUsers)
  app.get("/users/:id", getUser)
  app.put("/users/:id", updateUser)
  app.delete("/users/:id", deleteUser)

  app.post("/posts", createPost)
  app.get("/posts", getAllPosts)
}
