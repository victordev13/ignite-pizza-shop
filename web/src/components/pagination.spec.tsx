import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Pagination from './pagination'

const onPageChangeCallback = vi.fn() // spy

describe('Pagination', async () => {
  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={console.log}
      />,
    )

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 itens')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()

    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    // espero que `onPageChange` seja chamada com o parâmetro 1
    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })
})
