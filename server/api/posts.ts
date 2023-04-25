import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  console.log("api user: ", user)
  const data = await prisma.posts.findMany({
    select: {
      image: true,
      drink_type: true,
      created_at: true,
      caption: true,
      profiles: {
        select: {
          favdrink: true,
          username: true
        }
      }
    },
    orderBy: { created_at: 'desc' }
  })
  console.log("api data: ", data)
  return data
})
