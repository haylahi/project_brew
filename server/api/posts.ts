import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const data = await prisma.posts.findMany({
    where: {
      user_id: user.id
    },
    select: {
      username: true,
      image: true,
      drink_type: true,
      created_at: true,
      caption: true
    }
  })

  // const data = await prisma.posts.findMany({
  //   where: {
  //     user_id: user.id,
  //   },
  //   select: {
  //     image: true,
  //     id: true,
  //     drink_type: true
  //   }
  // })
  return data
})
