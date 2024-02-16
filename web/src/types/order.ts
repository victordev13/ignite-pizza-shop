export enum OrderStatus {
  pending = 'pending',
  canceled = 'canceled',
  processing = 'processing',
  delivering = 'delivering',
  delivered = 'delivered',
}

export interface Order {
  orderId: string
  createdAt: string
  status: OrderStatus
  customerName: string
  total: number
}

export interface DetailedOrder {
  id: string
  createdAt: string
  status: OrderStatus
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}
