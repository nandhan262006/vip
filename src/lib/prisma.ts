import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

let adapter: PrismaLibSql | undefined
let prismaInstance: PrismaClient | undefined

function getPrisma(): PrismaClient {
  if (prismaInstance) return prismaInstance

  try {
    if (process.env.DATABASE_URL && process.env.AUTH_TOKEN) {
      adapter = new PrismaLibSql({
        url: process.env.DATABASE_URL,
        authToken: process.env.AUTH_TOKEN,
      })
      prismaInstance = new PrismaClient({ adapter })
    } else {
      prismaInstance = new PrismaClient()
    }
  } catch {
    prismaInstance = new PrismaClient()
  }

  return prismaInstance
}

function safeDb(prisma: PrismaClient): PrismaClient {
  const handler: ProxyHandler<PrismaClient> = {
    get(target, prop: string) {
      const original = (target as unknown as Record<string, unknown>)[prop]
      if (typeof original === 'object' && original !== null && 'findMany' in (original as Record<string, unknown>)) {
        return new Proxy(original as Record<string, unknown>, {
          get(obj, method: string) {
            const fn = (obj as Record<string, unknown>)[method]
            if (typeof fn === 'function') {
              return async (...args: unknown[]) => {
                try {
                  return await (fn as (...a: unknown[]) => Promise<unknown>).bind(obj)(...args)
                } catch {
                  if (method === 'findUnique') return null
                  if (method === 'count') return 0
                  return []
                }
              }
            }
            return fn
          },
        })
      }
      return original
    },
  }

  return new Proxy(prisma, handler) as PrismaClient
}

export const prisma = safeDb(getPrisma())
