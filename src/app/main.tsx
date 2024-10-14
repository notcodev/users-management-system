import './global.css'
import { QueryClient } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from './application'
import { Providers } from './providers'

const root = document.querySelector('#root')!

const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Providers reactQuery={{ client: queryClient }}>
      <Suspense fallback={<div>234</div>}>
        <Application />
      </Suspense>
    </Providers>
  </React.StrictMode>,
)
