import './global.css'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from './application'
import { Providers } from './providers'
import { QueryClient } from '@tanstack/react-query'

const root = document.getElementById('root')!

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
