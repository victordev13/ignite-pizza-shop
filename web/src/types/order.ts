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
