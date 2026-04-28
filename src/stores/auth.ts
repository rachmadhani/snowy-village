import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Admin {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('admin_token'))
  const user = ref<Admin | null>(null)

  try {
    const savedUser = localStorage.getItem('admin_user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  } catch (e) {
    console.error('Failed to parse saved user', e)
  }

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(newToken: string, newUser: Admin) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem('admin_token', newToken)
    localStorage.setItem('admin_user', JSON.stringify(newUser))
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth
  }
})
