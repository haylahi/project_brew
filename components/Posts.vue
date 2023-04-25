<script setup>
const user = useSupabaseUser()

const { data: posts } = await useFetch('/api/posts', {
  headers: useRequestHeaders(['cookie'])
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-8 text-white">
      <div v-for="(post, postIndex) in posts" :key="postIndex" class="flex">
        {{ post }}
        <div
          class="max-w-6xl p-8 mx-auto bg-transparent border-4 border-orange-700 rounded-2xl"
        >
          {{ post.created_at }}
          <p class="text-xs">
            <span class="font-bold">
              {{ post.profiles.username }}
            </span>
            is drinking
            <span class="text-orange-700"> {{ post.drink_type }}</span>
          </p>
          <nuxt-img
            :src="post.image"
            provider="cloudinary"
            width="300"
            height="500"
            class="max-w-[400px] my-8"
          />
          <div class="">
            <p class="text-sm">
              {{ post.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
