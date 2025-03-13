// src/views/LoginView.vue
<template>
  <div class="login-container">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
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
              <v-btn
                variant="flat"
                color="primary"
                @click="login"
                block
                :loading="authStore.loading"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
<style scoped>
.login-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #3498db, #1abc9c);
}

.shape {
  position: absolute;
  border-radius: 50%;
}

.shape:nth-child(1) {
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  top: -150px;
  right: -100px;
  animation: float 15s ease-in-out infinite;
}

.shape:nth-child(2) {
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.15);
  bottom: -100px;
  left: -50px;
  animation: float 20s ease-in-out infinite reverse;
}

.shape:nth-child(3) {
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.2);
  top: 40%;
  left: 30%;
  animation: float 25s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, 15px) rotate(5deg);
  }
  50% {
    transform: translate(15px, 5px) rotate(10deg);
  }
  75% {
    transform: translate(5px, 10px) rotate(5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

.login-card {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.3) !important;
}
</style>
