import { api } from '@/lib/axios'

export interface ManagedRestaurantResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const { data } = await api.get<ManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return data
}
