<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

const post = reactive({
  image: '',
  caption: '',
  created_at: '',
  drink_type: ''
})

const uploadFile = ref(null)

const handleFileSelection = (e) => {
  uploadFile.value = e.target.files[0]
}
const handlePost = async () => {
  let formData = new FormData()

  formData.append('upload_preset', 'unsigned_preset')
  formData.append('folder', `users/posts/`)
  formData.append('file', uploadFile.value)
  await useFetch('https://api.cloudinary.com/v1_1/project-brew/image/upload', {
    method: 'POST',
    body: formData
  }).then(
    (res) => {
      const imageData = res.data.value
      const error = res.error.value
      if (error) {
        // dealing error
        console.log(error)
      } else {
        post.image = imageData.public_id
        console.log(imageData.public_id)
      }
    },
    (error) => {
      console.log('exception...')
      console.log(error)
    }
  )
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
          <label for="file">Select Header Image</label>

          <input
            type="file"
            name="file"
            accept="image/*"
            @change="handleFileSelection($event)"
          />
          <button>Submit</button>
        </div>
      </div>
    </form>
  </div>

</template>
