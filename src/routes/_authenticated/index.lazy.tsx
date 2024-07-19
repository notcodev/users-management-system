import { UsersPage } from '@/pages/users/page'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: UsersPage,
})
