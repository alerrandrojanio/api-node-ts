import Fastify from "fastify"
import cors from "@fastify/cors"
import { userRoutes } from "./controllers/UserController"
import { PostRoutes } from "./controllers/PostController"

const app = Fastify()
const port = 3333

app.register(cors)
app.register(userRoutes)
app.register(PostRoutes)

app
  .listen({
    port: port,
  })
  .then(() => {
    console.log(`Server is running on port ${port}`)
  })

app.get("/", async (request, response) => {
  return { message: "hello world" }
})
