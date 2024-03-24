import { api } from '@/lib/axios'
import { DetailedOrder } from '@/types/order'

export interface GetOrderDetailsParams {
  orderId: string
}

export type GetOrderDetailsResponse = DetailedOrder

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return data
}
