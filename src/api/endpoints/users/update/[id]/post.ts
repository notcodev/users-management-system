import { createRequest } from '@/api/request'
import { UserDto } from '@/api/types'

export type PostUpdateUserParams = Partial<
  Pick<UserDto, 'name' | 'roles' | 'surname' | 'login' | 'id'> & {
    password: string
  }
>

export const postUpdateUser = createRequest(
  (api, { id, ...params }: PostUpdateUserParams) => {
    return api.post(params, `/users/update/${id}`).json<UserDto>()
  },
)
