import api from './api'

export interface Location {
  id: number
  city_name: string
  address: string
  phone_number: string
  opening_hours: Record<string, string[]>
  formatted_hours: string[]
  map_url: string | null
  created_at: string
  updated_at: string
}

export interface LocationListResponse {
  data: Location[]
}

export const locationService = {
  async getAll(): Promise<LocationListResponse> {
    const response = await api.get<LocationListResponse>('/locations')
    return response.data
  },

  async getById(id: number): Promise<Location> {
    const response = await api.get<Location>(`/locations/${id}`)
    return response.data
  },

  async create(data: Partial<Location>): Promise<void> {
    await api.post('/locations', data)
  },

  async update(id: number, data: Partial<Location>): Promise<void> {
    await api.put(`/locations/${id}`, data)
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/locations/${id}`)
  }
}
