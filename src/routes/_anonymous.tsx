import { NotFoundPage } from '@/pages/not-found/page'
import { profileOptions } from '@/utils/query-options'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_anonymous')({
  component: Outlet,
  loader: async ({ context: { queryClient } }) => {
    const user = await queryClient
      .ensureQueryData(profileOptions())
      .catch(() => null)

    if (user !== null) {
      throw redirect({ to: '/' })
    }
  },
})
