import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginMutation } from '@/utils/query-options'

const loginSchema = z.object({
  login: z.string().min(1, 'Поле login не может быть пустым'),
  password: z.string().min(1, 'Поле password не может быть пустым'),
})

export const LoginPage = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
  })
  const loginMutation = useLoginMutation()

  return (
    <main className="max-w-96 mt-8 mx-auto">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(async (data) =>
            loginMutation.mutateAsync(data).then(() => navigate({ to: '/' })),
          )}
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="Введите ваш логин" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Введите ваш пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </main>
  )
}
