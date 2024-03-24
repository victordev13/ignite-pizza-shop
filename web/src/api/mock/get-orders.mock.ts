import { http, HttpResponse } from 'msw'

import { OrderStatus } from '@/types/order'

import { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']
const statuses: OrderStatus[] = [
  OrderStatus.pending,
  OrderStatus.canceled,
  OrderStatus.delivered,
  OrderStatus.delivering,
  OrderStatus.processing,
]

const orders: Orders = Array.from({ length: 60 }).map((_, i) => ({
  orderId: `order-${i + 1}`,
  customerName: `Customer ${i + 1}`,
  createdAt: new Date().toISOString(),
  total: 2500 * Math.floor(Math.random() * 10),
  status: statuses[i % 5],
}))

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(orderId),
      )
    }

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
