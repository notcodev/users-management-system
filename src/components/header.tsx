import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { useLogoutMutation } from '@/utils/query-options'

export const Header = () => {
  const logoutMutation = useLogoutMutation()

  return (
    <header className="border-b p-4 flex justify-between items-center">
      <nav>
        <Link className="font-medium hover:underline">Пользователи</Link>
      </nav>
      <Button onClick={() => logoutMutation.mutate()} size="sm" variant="ghost">
        Выйти
      </Button>
    </header>
  )
}
