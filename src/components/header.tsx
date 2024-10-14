import { Link } from '@tanstack/react-router'
import { useLogoutMutation } from '@/utils/query-options'
import { Button } from './ui/button'

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
