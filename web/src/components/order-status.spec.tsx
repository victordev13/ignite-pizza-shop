import { render } from '@testing-library/react'

import { OrderStatus as OrderStatusType } from '@/types/order'

import { OrderStatus } from './order-status'

describe.each([
  {
    orderStatus: OrderStatusType.pending,
    expectedText: 'Pendente',
    expectedBadgeColor: 'bg-slate-400',
  },
  {
    orderStatus: OrderStatusType.canceled,
    expectedText: 'Cancelado',
    expectedBadgeColor: 'bg-rose-500',
  },
  {
    orderStatus: OrderStatusType.delivered,
    expectedText: 'Entregue',
    expectedBadgeColor: 'bg-emerald-500',
  },
  {
    orderStatus: OrderStatusType.delivering,
    expectedText: 'Em entrega',
    expectedBadgeColor: 'bg-amber-500',
  },
  {
    orderStatus: OrderStatusType.processing,
    expectedText: 'Em preparo',
    expectedBadgeColor: 'bg-amber-500',
  },
])(
  'should display the right text based on the order status',
  ({ orderStatus, expectedText, expectedBadgeColor }) => {
    it(`Order status "${orderStatus}" to have a text "${expectedText}" and badge with color "${expectedBadgeColor}"`, () => {
      const wrapper = render(<OrderStatus status={orderStatus} />)

      // wrapper.debug() // debug do que está sendo exibido na interface (html)

      const statusText = wrapper.getByText(expectedText)
      const badgeElement = wrapper.getByTestId('badge')

      expect(statusText).toBeInTheDocument()
      expect(badgeElement).toHaveClass(expectedBadgeColor)
    })
  },
)
