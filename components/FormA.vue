<script setup lang="ts">
import { FormValues, ChildValues } from '@/types/formValues'

const child: ChildValues = {
  child1: 'child text',
  child2: false
}
const formValue = ref<FormValues>({
  text1: 'default text',
  text2: 1234,
  childs: [child]
})

const onSubmit = () => {
  console.log(formValue.value)
}
</script>
<template>
  <v-form v-model="valid" @submit.prevent="onSubmit">
    <v-text-field v-model="formValue.text1"></v-text-field>
    <v-text-field></v-text-field>
    <v-btn type="submit">submit</v-btn>
  </v-form>
</template>
