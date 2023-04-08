<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div
    class="flex flex-row justify-start w-full px-16 py-8 mx-auto mb-9"
  >
    <h1>Brewster 🍺</h1>
    <div class="ml-auto">
      <nuxt-link v-if="!user" to="/auth">Login</nuxt-link>
      <nuxt-link to="/account" class="underline">Account</nuxt-link>
    </div>
  </div>
</template>
