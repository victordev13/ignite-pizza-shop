import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/auth/sign-in'

import { DashBoard } from './pages/app/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashBoard />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])
