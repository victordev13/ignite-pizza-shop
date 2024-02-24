import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query'

import { SignIn } from './sign-in'

describe('SignIn', () => {
  it('should highlight the nav link when is the current page link', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter
            initialEntries={['/sign-in?email=johndoe@localhost.test']}
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })

    const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

    expect(emailInput.value).to.equal('johndoe@localhost.test')
  })
})
