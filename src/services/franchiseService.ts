import api from './api'

export interface FranchiseInquiry {
  id: number
  name: string
  email: string
  phone_number: string
  location: string
  message: string
  created_at: string
  updated_at: string
}

export interface FranchiseListResponse {
  data: FranchiseInquiry[]
}

export interface FranchiseSubmitResponse {
  data: FranchiseInquiry
  email_sent: boolean
}

export const franchiseService = {
  async getAll(): Promise<FranchiseListResponse> {
    const response = await api.get<FranchiseListResponse>('/franchises')
    return response.data
  },

  async getById(id: number): Promise<FranchiseInquiry> {
    const response = await api.get<FranchiseInquiry>(`/franchises/${id}`)
    return response.data
  },

  async submit(data: {
    name: string
    email: string
    phone_number: string
    location: string
    message: string
  }): Promise<FranchiseSubmitResponse> {
    const response = await api.post<FranchiseSubmitResponse>('/franchises', data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/franchises/${id}`)
  }
}
