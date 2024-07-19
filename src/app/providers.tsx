import {
  QueryClientProvider,
  QueryClientProviderProps,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export interface ProvidersProps {
  reactQuery: Omit<QueryClientProviderProps, 'children'>
}

export const Providers = ({
  children,
  reactQuery,
}: PropsWithChildren<ProvidersProps>) => (
  <QueryClientProvider {...reactQuery}>{children}</QueryClientProvider>
)
