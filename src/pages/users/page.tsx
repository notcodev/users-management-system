import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
  EllipsisVerticalIcon,
  KeyRoundIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserDto } from '@/api/types'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  listUsersOptions,
  useCreateUserMutation,
  useDeletUserMutation,
  useUpdateUserMutation,
} from '@/utils/query-options'
import { EditUserFormDialog } from './components'

const UsersTable = () => {
  const usersQuery = useQuery(listUsersOptions())

  if (usersQuery.isPending) {
    return null
  }

  if (usersQuery.isError) {
    return null
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Фамилия</TableHead>
          <TableHead>Логин</TableHead>
          <TableHead>Роли</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersQuery.data.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.surname}</TableCell>
            <TableCell>{user.login}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                {user.roles.map((role) => (
                  <Badge key={role} variant="outline">
                    {role}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="w-12">
              <ActionsDropdownMenu user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const DeleteUserDialog = ({
  open,
  onOpenChange,
  userId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: number
}) => {
  const deleteUserMutation = useDeletUserMutation(userId)

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие не может быть отменено. Это приведет к безвозвратному
            удалению данного пользователя и удалинию данные с серверов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteUserMutation.isPending}>
            Отменить
          </AlertDialogCancel>
          <Button
            disabled={deleteUserMutation.isPending}
            variant="destructive"
            onClick={() =>
              deleteUserMutation.mutateAsync().then(() => onOpenChange(false))
            }
          >
            Удалить
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const updatePasswordSchema = z.object({
  password: z.string().min(1, 'Поле Пароль не должно быть пустым'),
})

const PasswordChangeDialog = ({
  userId,
  open,
  onChangeOpen,
}: {
  userId: number
  open: boolean
  onChangeOpen: (open: boolean) => void
}) => {
  const formId = useId()
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '' },
  })
  const updateUserMutation = useUpdateUserMutation(userId)

  return (
    <Dialog open={open} onOpenChange={onChangeOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Обновление пароля</DialogTitle>
          <DialogDescription>
            Введите новый пароль и нажмите кнопку Сохранить
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit((data) =>
              updateUserMutation.mutateAsync(data).then(() => form.reset()),
            )}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={updateUserMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={updateUserMutation.isPending}
            form={formId}
            type="submit"
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ActionsDropdownMenu({ user }: { user: UserDto }) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false)
  const [isRemoveOpen, setIsRemoveOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Редактировать</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPasswordChangeOpen(true)}>
              <KeyRoundIcon className="mr-2 h-4 w-4" />
              <span>Задать новый пароль</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup onClick={() => setIsRemoveOpen(true)}>
            <DropdownMenuItem className="text-red-500 focus:text-red-600">
              <TrashIcon className="mr-2 h-4 w-4" />
              <span>Удалить пользователя</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserFormDialog
        id={user.id}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        defaultValues={user}
      />
      <DeleteUserDialog
        open={isRemoveOpen}
        onOpenChange={setIsRemoveOpen}
        userId={user.id}
      />
      <PasswordChangeDialog
        open={isPasswordChangeOpen}
        onChangeOpen={setIsPasswordChangeOpen}
        userId={user.id}
      />
    </>
  )
}

const createUserSchema = z.object({
  login: z.string().min(1, 'Поле Логин не может быть пустым'),
  name: z.string().min(1, 'Поле Имя не может быть пустым'),
  surname: z.string().min(1, 'Поле Фамилия не может быть пустым'),
  password: z.string().min(1, 'Поле Пароль не может быть пустым'),
})

const CreateUserDialog = () => {
  const formId = useId()
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { login: '', name: '', surname: '', password: '' },
  })
  const createUserMutation = useCreateUserMutation()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="ml-auto">
          Создать нового пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание пользователя</DialogTitle>
          <DialogDescription>
            Заполните соответствующие поля и нажмите кнопку Создать
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit((data) =>
              createUserMutation.mutateAsync(data).then(() => form.reset()),
            )}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input disabled={createUserMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input disabled={createUserMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input disabled={createUserMutation.isPending} {...field} />
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
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={createUserMutation.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={createUserMutation.isPending}
            form={formId}
            type="submit"
          >
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const UsersPage = () => {
  return (
    <main className="flex flex-col ">
      <div className="p-4">
        <CreateUserDialog />
      </div>
      <UsersTable />
    </main>
  )
}
