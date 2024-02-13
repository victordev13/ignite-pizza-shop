import { OrderStatus as OrderStatusType } from '@/types/order'

interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMap: Record<OrderStatusType, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

const statusColor: Record<OrderStatusType, string> = {
  pending: 'bg-slate-400',
  canceled: 'bg-rose-500',
  delivered: 'bg-emerald-500',
  delivering: 'bg-amber-500',
  processing: 'bg-amber-500',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${statusColor[status]}`} />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
