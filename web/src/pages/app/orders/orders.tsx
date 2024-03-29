import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getOrders } from '@/api/get-orders'
import Pagination from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderStatus } from '@/types/order'

import { OrderTableFilters } from './order-table-filters'
import OrderTableRow from './order-table-row'
import { OrderTableSkeleton } from './order-table-skeleton'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = Math.abs(
    z.coerce
      .number()
      .default(1)
      .transform((page) => page - 1)
      .parse(searchParams.get('page') ?? 1),
  )

  const { data: ordersPaginated, isLoading } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status && status in OrderStatus ? status : null,
      }),
  })

  const handlePageChange = (pageIndex: number) => {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())

      return prev
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>

      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <OrderTableSkeleton />
              ) : (
                ordersPaginated &&
                ordersPaginated.orders.map((order) => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {ordersPaginated && (
          <Pagination
            pageIndex={ordersPaginated.meta.pageIndex}
            perPage={ordersPaginated.meta.perPage}
            totalCount={ordersPaginated.meta.totalCount}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  )
}
