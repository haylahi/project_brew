<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const favDrink = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

let { data } = await supabase
  .from('profiles')
  .select('username, favdrink, avatar_url')
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  favDrink.value = data.favdrink
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      favdrink: favDrink.value,
      avatar_url: avatar_path.value,
      updated_at: new Date()
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal' // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" :value="user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="favdrink">Favorite Drink</label>
      <input id="favdrink" type="text" v-model="favDrink" />
    </div>

    <div>
      <input
        type="submit"
        class=""
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>
    <div>
      <button class="block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>
