import { http, HttpResponse } from 'msw'

import { OrderStatus } from '@/types/order'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'john@doe.com',
      phone: '27999999999',
    },
    status: OrderStatus.pending,
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'item-1',
        priceInCents: 7200,
        quantity: 2,
        product: {
          name: 'Pizza 4 queijos',
        },
      },
      {
        id: 'item-2',
        priceInCents: 8000,
        quantity: 2,
        product: {
          name: 'Pizza Mista',
        },
      },
    ],
    totalInCents: 30800,
  })
})
