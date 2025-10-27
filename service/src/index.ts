import { Elysia } from "elysia";
import { z } from "zod";
import { auth } from "./auth";
import { openapi } from "@elysiajs/openapi";
import { betterAuthPlugin, OpenAPI } from "./http/plugins/better-auth";
import { cors } from "@elysiajs/cors";
const app = new Elysia()
.use(  cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization']
        }))
  .use(
    openapi({
      documentation: {
        info: {
          title: "Minha API com Elysia + BetterAuth",
          description: "Documentação gerada automaticamente com OpenAPI",
          version: "1.0.0",
        },
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    })
  )
  .use(betterAuthPlugin)
  .get("/", () => "Hello Elysia 👋")
  .get(
    "/users/:id",
    ({ params, user }) => {
      const userId = params.id;
      const authenticatedUser = user?.name;

      return { id: userId, name: "John Doe", requestedBy: authenticatedUser };
    },
    {
      auth: true,
      detail: {
        summary: "Obter usuário por ID",
        tags: ["User"],
      },
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          requestedBy: z.string().optional(),
        }),
      },
    }
  )
  .listen(3333);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
