<script setup lang="ts">
import { Prisma } from '@prisma/client'

const email = ref<string | null>(null)
const name = ref<string | null>(null)

// https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
// undifindは何もしないを意味する
// nullはnull値

const formValue = ref<Prisma.UserCreateInput>({
  email: '',
  name: null,
  posts: {
    create: [
      {
        title: '',
        content: null,
        published: undefined
      }
    ]
  }
})

type PostsInput = {
  posts: Prisma.PostCreateInput[]
}
const formValue2 = ref<Prisma.UserCreateWithoutPostsInput & PostsInput>({
  email: '',
  name: null,
  posts: []
})

const valid = ref<boolean>(false)

const rules = {
  required: (value: any) => !!value || 'Field is required',
  emailFormat: (value: string) => {
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
    return regex.test(value) || 'メールアドレスを入力してください'
  }
}

const onSubmit = async () => {
  const { data, error } = await useFetch('/api/users', {
    method: 'POST',
    body: {
      email: email.value,
      name: name.value
    }
  })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      statusMessage: error.value.statusMessage
    })
  }

  console.log(data.value)
}
</script>

<template>
  <v-form v-model="valid" @submit.prevent="onSubmit">
    <v-text-field
      v-model="email"
      type="email"
      label="email"
      :rules="[rules.required, rules.emailFormat]"
    ></v-text-field>
    <v-text-field v-model="formValue.name" label="name" :rules="[]"></v-text-field>
    <!-- <v-text-field v-model="name" label="title" :rules="[rules.required]"></v-text-field>
    <v-text-field v-model="name" label="content" :rules="[rules.required]"></v-text-field> -->
    <v-btn type="submit" :disabled="!valid">submit</v-btn>
  </v-form>
</template>
