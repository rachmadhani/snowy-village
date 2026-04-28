import api from './api'
import type { Admin } from '@/stores/auth'

export interface LoginResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: Admin
}

export const authService = {
  async login(credentials: any): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/admin/auth/login', credentials)
    return response.data
  },

  async me(): Promise<Admin> {
    const response = await api.get<Admin>('/admin/auth/me')
    return response.data
  },

  async logout() {
    await api.post('/admin/auth/logout')
  }
}
