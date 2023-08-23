<script setup lang="ts">
const route = useRoute()
const { data: user } = await useFetch(`/api/users/${route.params.id} as id`)

const email = ref<string | null>(user.value!.email)
const name = ref<string | null>(user.value!.name)

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
    <v-text-field v-model="name" label="name" :rules="[rules.required]"></v-text-field>
    <v-btn type="submit" :disabled="!valid">submit</v-btn>
  </v-form>
</template>
