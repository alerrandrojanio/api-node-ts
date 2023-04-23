import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes/routes"

const app = Fastify()
const port = 3333

app.register(cors)
app.register(appRoutes)

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
