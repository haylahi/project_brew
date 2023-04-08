<script setup>
definePageMeta({
  middleware: 'auth'
})
const user = useSupabaseUser()
</script>

<template>
  <AppHeader/>
  <div class="mx-auto max-w-7xl">
    <div v-if="user">
      <!-- Logged in? {{ user }} -->
      <Posts />
    </div>
  </div>
</template>
