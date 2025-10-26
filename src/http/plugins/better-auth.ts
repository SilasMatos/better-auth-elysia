import { auth } from "@/auth";
import Elysia from "elysia";


export const betterAuthPlugin = new Elysia({ name: "better-auth" })
  .mount(auth.handler) // Monta o manipulador de autenticação do better-auth
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({ headers });

        if (!session) {
          return { status: 401, body: { error: "Unauthorized" } };
        }

        return { 
          user: session.user,
          session: session

        }
      }
    }
  }); // Macro para resolver a sessão do usuário

  let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>
  const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema())

  export const OpenAPI = {
      getPaths: (prefix = '/auth/api') =>
          getSchema().then(({ paths }) => {
              const reference: typeof paths = Object.create(null)

              for (const path of Object.keys(paths)) {
                  const key = prefix + path
                  reference[key] = paths[path]

                  for (const method of Object.keys(paths[path])) {
                      const operation = (reference[key] as any)[method]

                      operation.tags = ['Better Auth']
                  }
              }

              return reference
          }) as Promise<any>,
      components: getSchema().then(({ components }) => components) as Promise<any>
  } as const // Utilitário para gerar o esquema OpenAPI do better-auth
