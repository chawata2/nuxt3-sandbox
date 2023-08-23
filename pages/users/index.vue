<script setup lang="ts">
const { data } = await useFetch('/api/users')
console.log(data.value)
</script>

<template>
  <div>
    {{ data }}
    <v-btn @click="navigateTo('/users/create')">作成</v-btn>
  </div>
</template>
