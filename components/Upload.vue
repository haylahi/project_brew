<script setup>
const file = ref(null)

const handleAvatarUpload = async (e) => {
  file.value = e.target.files[0]

  // Upload file to Cloudinary and get public_id
  const options = {
    public_id: 'profile-image',
    folder: `users/avatar/`
  }

//   try {
//     const response = await $fetch('/api/cloudinary/upload', {
//       method: 'POST',
//       body: {
//         options: options,
//         file: file.value
//       }
//     })
//     console.log('Uploaded!', response.asset)
//   } catch (error) {
//     console.log('Error uploading file', error)
//   }
}
</script>

<template>
  <div class="my-2">
    <input
      id="image"
      ref="image"
      type="file"
      class="inputfile img"
      name="image"
      aria-describedby="imageFile"
      accept="image/*"
      @change="handleAvatarUpload"
    />
    <label for="image">
            <nuxt-img provider="cloudinary" src="/images/test/PXL_20230408_223853485.MP.jpg"/>

      <strong><i class="fas fa-upload"></i> Choose an Image&hellip;</strong>
    </label>
  </div>
</template>
