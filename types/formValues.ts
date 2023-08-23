import { Prisma } from '@prisma/client'

type PostForm = {
  title: string | null
  conteint: string | null
  published: boolean
}

export type UserForm = {
  email: string | null
  name: string | null
  posts: PostForm[]
}
