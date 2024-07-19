import { createRequest } from '@/api/request'
import { UserDto } from '@/api/types'

export type GetListUsersResponse = UserDto[]

export const getListUsers = createRequest((api) => {
  return api.get('/users').json<GetListUsersResponse>()
})
