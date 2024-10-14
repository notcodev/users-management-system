import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const NotFoundPage = () => {
  return (
    <main className="mx-auto max-w-[560px] h-screen grid place-items-center p-4">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-center text-7xl font-bold">404</h1>
        <p className="text-md">
          Страница, которую вы пытаетесь открыть, не существует. Возможно, вы
          неправильно ввели адрес или страница была перемещена на другой
          URL&#8209;адрес. Если вы думаете, что это ошибка, обратитесь в службу
          поддержки.
        </p>
        <Button asChild>
          <Link to="/">Вернуться на главную страницу</Link>
        </Button>
      </div>
    </main>
  )
}
