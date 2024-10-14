import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useId } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'
import { listRolesOptions, useUpdateUserMutation } from '@/utils/query-options'

const editUserSchema = z.object({
  login: z.string().min(1, 'Поле Логин не может быть пустым'),
  name: z.string().min(1, 'Поле Имя не может быть пустым'),
  surname: z.string().min(1, 'Поле Фамилия не может быть пустым'),
  roles: z.array(z.string()),
})

const LoginField = ({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof editUserSchema>>
  isPending: boolean
}) => {
  return (
    <FormField
      control={form.control}
      name="login"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Логин</FormLabel>
          <FormControl>
            <Input disabled={isPending} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const NameField = ({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof editUserSchema>>
  isPending: boolean
}) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Имя</FormLabel>
          <FormControl>
            <Input disabled={isPending} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const SurnameField = ({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof editUserSchema>>
  isPending: boolean
}) => {
  return (
    <FormField
      control={form.control}
      name="surname"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Фамилия</FormLabel>
          <FormControl>
            <Input disabled={isPending} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const RolesOption = ({
  isActive,
  value,
  form,
}: {
  value: string
  form: UseFormReturn<z.infer<typeof editUserSchema>>
  isActive: boolean
}) => {
  return (
    <CommandItem
      value={value}
      onSelect={() => {
        const rolesValue = form.getValues().roles
        form.setValue(
          'roles',
          !isActive
            ? [...rolesValue, value]
            : rolesValue.filter((existingRole) => existingRole !== value),
        )
      }}
    >
      <CheckIcon
        className={cn('h-4 w-4 mr-2', isActive ? 'opacity-100' : 'opacity-0')}
      />
      {value}
    </CommandItem>
  )
}

const RolesField = ({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof editUserSchema>>
  isPending: boolean
}) => {
  const rolesQuery = useQuery(listRolesOptions())

  return (
    <FormField
      control={form.control}
      name="roles"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Роли</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    ' justify-between',
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    !field.value && 'text-muted-foreground',
                  )}
                  disabled={isPending}
                >
                  {field.value.length > 0
                    ? field.value.join(', ')
                    : 'Выберите роли'}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>Не найдено ни одной роли.</CommandEmpty>
                  <CommandGroup>
                    {(() => {
                      if (rolesQuery.isPending) {
                        return null
                      }

                      if (rolesQuery.isError) {
                        return null
                      }

                      return rolesQuery.data.map(({ role }) => (
                        <RolesOption
                          key={role.name}
                          value={role.name}
                          isActive={field.value.includes(role.name)}
                          form={form}
                        />
                      ))
                    })()}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const EditUserFormDialog = ({
  id,
  defaultValues,
  open,
  onOpenChange,
}: {
  id: number
  defaultValues: {
    login: string
    name: string
    surname: string
    roles: string[]
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const formId = useId()
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues,
  })
  const updateUserMutation = useUpdateUserMutation(id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактирование пользователя</DialogTitle>
          <DialogDescription>
            Внесите изменения и нажмите кнопку Сохранить
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit((data) =>
              updateUserMutation.mutateAsync({
                ...data,
                roles: Array.from(data.roles.values()),
              }),
            )}
            className="flex flex-col gap-2"
          >
            <NameField form={form} isPending={updateUserMutation.isPending} />
            <SurnameField
              form={form}
              isPending={updateUserMutation.isPending}
            />
            <LoginField form={form} isPending={updateUserMutation.isPending} />
            <RolesField form={form} isPending={updateUserMutation.isPending} />
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
