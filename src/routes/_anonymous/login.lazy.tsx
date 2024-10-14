import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/pages/login/page'

export const Route = createLazyFileRoute('/_anonymous/login')({
  component: LoginPage,
})
