import { createLazyFileRoute } from '@tanstack/react-router'
import { UsersPage } from '@/pages/users/page'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: UsersPage,
})
