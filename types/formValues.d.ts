type PostCreateForm = {
  title: string | undefined
  content: string | undefined
  published: boolean
}

type UserCreateForm = {
  email: string | undefined
  name: string | undefined
  posts: PostForm[]
}
