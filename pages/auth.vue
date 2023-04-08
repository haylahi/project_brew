<script setup>
const supabaseAuth = useSupabaseAuthClient()

const isLoggingIn = ref(true)
const form = reactive({
  email: '',
  password: ''
})

const validationErrors = ref('')
const loginErrors = ref('')

const handleLoginForm = async () => {
  console.log('Form is being submitted')

  if (!form.email || !form.password) {
    validationErrors.value = 'Please fill all the fields above.'
    return
  }

  if (!isLoggingIn.value) {
    return handleSignup()
  }
  try {
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    if (error) {
      loginErrors.value = error.message
      return
    }
    loginErrors.value = ''
    console.log('logindata', data)
    if (data) {
      useRouter().push('/')
    }
  } catch (error) {
    loginErrors.value = 'Something went wrong'
  }
}

const handleSignup = async () => {
  try {
    const { data, error } = await supabaseAuth.auth.signUp({
      email: form.email,
      password: form.password
    })
    if (error) {
      loginErrors.value = error.message
      return
    }
    console.log(data)
    console.log('logindata', data)
    if (data) {
      useRouter().push('/')
    }
  } catch (error) {
    loginErrors.value = 'Something went wrong'
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleLoginForm">
      <div>
        <label for="email">Email</label>
        <input
          v-model="form.email"
          type="email"
          name="email"
          id="email"
          placeholder="some email"
        />
      </div>
      <div>
        <label for="password">password</label>
        <input
          v-model="form.password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <!-- buttons -->
      <div>
        <button type="submit">
          <template v-if="isLoggingIn"> Login </template>
          <template v-else> Signup </template>
        </button>

        <div>
          <button type="button" @click="isLoggingIn = !isLoggingIn">
            <template v-if="isLoggingIn"> click to change to sign up</template>
            <template v-else> Already have account login</template>
          </button>
        </div>
        <div class="text-red-500">
          {{ validationErrors }}
        </div>
        <div class="text-red-500">
          {{ loginErrors }}
        </div>
      </div>
    </form>
  </div>
</template>
