<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

const post = reactive({
  image: '/profiles/test/PXL_20230408_223853485.MP.jpg',
  caption: '',
  created_at: '',
  drink_type: ''
})

const handlePost = async () => {
  try {
    const { data, error } = await client.from('posts').insert({
      caption: post.caption,
      drink_type: post.drink_type,
      user_id: user.value.id,
      image: post.image
    })
    if (error) {
      console.error(error.message)
    }
    if (data) {
      console.log(data)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handlePost">
      <div class="flex items-end gap-5">
        <div class="w-5/12">
          <label for="caption">caption</label>
          <input
            type="text"
            v-model="post.caption"
            id="caption"
            name="caption"
            class="w-full text-black"
          />
          <label class="block">
            <span class="">Drink type</span>
            <select
              v-model="post.drink_type"
              class="block w-full mt-1 text-black"
            >
              <option>PBR</option>
              <option>IPA</option>
            </select>
          </label>
          <button>Submit</button>
        </div>
      </div>
    </form>
  </div>

  <Upload />
</template>
