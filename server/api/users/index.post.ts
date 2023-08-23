import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      posts: {
        create: [
          {
            title: 'foo',
            content: 'foo bar baz!!',
            published: true
          },
          {
            title: 'baz',
            content: 'foo bar baz!!',
            published: false
          }
        ]
      }
    },
    include: {
      posts: true
    }
  })
  console.log(user)

  return user
})
