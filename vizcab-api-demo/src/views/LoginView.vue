// src/views/LoginView.vue
<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login to Vizcab API Demo</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
            <v-alert v-if="authStore.error" type="error" dense>
              {{ authStore.error }}
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="flat" color="primary" @click="login" block :loading="authStore.loading">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../store'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')
    const authStore = useAuthStore()
    const router = useRouter()

    const login = async () => {
      const success = await authStore.login(email.value, password.value)
      if (success) {
        router.push('/search')
      }
    }

    return {
      email,
      password,
      authStore,
      login,
    }
  },
}
</script>
