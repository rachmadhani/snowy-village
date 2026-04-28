import api from './api'

export interface Product {
  id: number
  product_title: string
  product_description: string
  product_image: string | null
  product_badge_popular: boolean
  created_at: string
  updated_at: string
}

export interface ProductListResponse {
  data: Product[]
}

export const productService = {
  async getAll(): Promise<ProductListResponse> {
    const response = await api.get<ProductListResponse>('/products')
    return response.data
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },

  async create(formData: FormData): Promise<Product> {
    const response = await api.post<Product>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async update(id: number, formData: FormData): Promise<any> {
    // API spec says update uses POST with _method=PUT for multipart/form-data compatibility
    formData.append('_method', 'PUT')
    const response = await api.post(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`)
  }
}
