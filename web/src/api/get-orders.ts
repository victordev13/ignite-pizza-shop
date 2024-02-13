import { api } from '@/lib/axios'
import { Order } from '@/types/order'

interface GetOrdersParams {
  pageIndex?: number | null
}

export interface GetOrdersResponse {
  orders: Order[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({ pageIndex }: GetOrdersParams) {
  const { data } = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: pageIndex || 0,
    },
  })

  return data
}
