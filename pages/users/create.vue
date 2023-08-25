<script setup lang="ts">
import type { InternalApi } from 'nitropack'
const flag = false

const formValue = ref<UserCreateForm>({
  email: undefined,
  name: undefined,
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

let url: string = '/api/users'
if (flag) {
  url = `/api/users/asdf`
}

const onSubmit = async () => {
  // useFetchのurlに変数を指定するとdataの型がunknownになるので、型を明示する必要がある。
  // 新規作成と更新のAPIレスポンスは同一なのでどちらかの型を指定する。
  const { data, error } = await useFetch<InternalApi['/api/users']['post']>(url, {
    method: 'post',
    body: {
      email: formValue.value.email,
      name: formValue.value.name
    }
  } as Object)

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
      v-model="formValue.email"
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
