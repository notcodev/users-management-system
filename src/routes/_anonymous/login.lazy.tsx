import { LoginPage } from '@/pages/login/page'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_anonymous/login')({
  component: LoginPage,
})
