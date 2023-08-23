import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const params = event.context.params
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params!.id)
    },
    include: {
      posts: true
    }
  })
  return user
})
