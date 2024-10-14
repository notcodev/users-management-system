import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { api } from '@/api'
import { PostUpdateUserParams } from '@/api/endpoints'
import { PostCreateUserParams } from '@/api/endpoints/users/create/post'
import { updateToken } from '@/api/request'

export const profileOptions = () =>
  queryOptions({
    queryFn: () => api.getProfile(),
    queryKey: ['profile'],
  })

export const listUsersOptions = () =>
  queryOptions({ queryKey: ['users'], queryFn: () => api.getListUsers() })

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.postLogin,
    onSuccess: (data) => {
      updateToken(data.access_token)
      return queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export const useUpdateUserMutation = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<PostUpdateUserParams, 'id'>) =>
      api.postUpdateUser({ id, ...data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export const useDeletUserMutation = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.postDeleteUser({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PostCreateUserParams) => api.postCreateUser(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export const listRolesOptions = () =>
  queryOptions({
    queryKey: ['roles'],
    queryFn: () => api.getListRoles(),
  })

export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.postLogout,
    onSuccess: async () => {
      updateToken(null)
      queryClient.clear()
      return navigate({ to: '/login' })
    },
  })
}
