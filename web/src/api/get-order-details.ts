import { api } from '@/lib/axios'
import { DetailedOrder } from '@/types/order'

interface GetOrderDetailsParams {
  orderId: string
}

type GetOrderDetailsResponse = DetailedOrder

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return data
}
