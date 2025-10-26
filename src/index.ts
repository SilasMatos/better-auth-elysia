import { Elysia } from "elysia";
import {z} from 'zod'

const app = new Elysia()
.get("/", () => "Hello Elysia")
.get("/users/:id", ({params}) =>  {
  const userId = params.id
params: z.object({
  id: z.string().uuid()
})  

}

)
.listen(3333);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
