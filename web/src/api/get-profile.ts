import { api } from '@/lib/axios'

interface ProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const { data } = await api.get<ProfileResponse>('/me')

  return data
}
