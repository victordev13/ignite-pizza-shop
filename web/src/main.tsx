import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMSW } from './api/mock/index.ts'
import { App } from './app.tsx'
import { env } from './env'

const render = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

if (env.MODE !== 'test') {
  render()
} else {
  enableMSW().then(() => render())
}
