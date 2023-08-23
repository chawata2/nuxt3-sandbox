<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/users/${route.params.id} as id`)
</script>

<template>
  <div>
    {{ data }}
    <v-btn @click="navigateTo(`/users/${$route.params.id}/edit`)">編集</v-btn>
  </div>
</template>
